import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../api/auth";
import { useAuth } from "../context/AuthContext";

interface FieldErrors {
  name?: string;
  studentId?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const MAROON = "#7b0d1e";
const MAROON_DARK = "#4a0810";
const GOLD = "#c9a227";
const GOLD_LIGHT = "#e8c84a";

const strengthConfig = [
  { label: "",        color: "transparent" },
  { label: "Weak",    color: "#ef4444" },
  { label: "Fair",    color: "#f97316" },
  { label: "Good",    color: "#eab308" },
  { label: "Strong",  color: "#22c55e" },
];

function Field({
  label, id, type = "text", placeholder, value, onChange,
  error, hint, disabled, right,
}: {
  label: string; id: string; type?: string; placeholder: string;
  value: string; onChange: (v: string) => void;
  error?: string; hint?: string; disabled: boolean;
  right?: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label htmlFor={id} style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#374151", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {label}
      </label>
      <div style={{ position: "relative" }}>
        <input
          id={id} type={type} placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          style={{
            width: "100%",
            padding: right ? "12px 44px 12px 16px" : "12px 16px",
            borderRadius: "12px",
            border: error ? "1.5px solid #f87171" : "1.5px solid #e5e7eb",
            background: error ? "#fff5f5" : "#f9fafb",
            fontSize: "14px", outline: "none",
            fontFamily: "'Inter', sans-serif",
            transition: "all 0.15s", boxSizing: "border-box",
          }}
          onFocus={(e) => { e.target.style.borderColor = MAROON; e.target.style.background = "#fff"; e.target.style.boxShadow = "0 0 0 3px rgba(123,13,30,0.1)"; }}
          onBlur={(e) => { e.target.style.borderColor = error ? "#f87171" : "#e5e7eb"; e.target.style.background = error ? "#fff5f5" : "#f9fafb"; e.target.style.boxShadow = "none"; }}
        />
        {right && (
          <div style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)" }}>
            {right}
          </div>
        )}
      </div>
      {error && <p style={{ fontSize: "12px", color: "#dc2626" }}>{error}</p>}
      {!error && hint && <p style={{ fontSize: "12px", color: "#9ca3af" }}>{hint}</p>}
    </div>
  );
}

export function RegisterPage() {
  const navigate    = useNavigate();
  const { setAuth } = useAuth();

  const [name, setName]                       = useState("");
  const [studentId, setStudentId]             = useState("");
  const [email, setEmail]                     = useState("");
  const [password, setPassword]               = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass]               = useState(false);

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg]   = useState<string | null>(null);
  const [loading, setLoading]         = useState(false);

  const passwordStrength = (() => {
    if (!password) return 0;
    let s = 0;
    if (password.length >= 8)           s++;
    if (/[A-Z]/.test(password))         s++;
    if (/[0-9]/.test(password))         s++;
    if (/[^A-Za-z0-9]/.test(password))  s++;
    return s;
  })();

  function handleStudentIdChange(raw: string) {
    const digits = raw.replace(/\D/g, "").slice(0, 9);
    let f = digits;
    if (digits.length > 2) f = digits.slice(0, 2) + "-" + digits.slice(2);
    if (digits.length > 6) f = digits.slice(0, 2) + "-" + digits.slice(2, 6) + "-" + digits.slice(6);
    setStudentId(f);
    setFieldErrors((p) => ({ ...p, studentId: undefined }));
  }

  function validate(): boolean {
    const errs: FieldErrors = {};
    if (!name.trim())                       errs.name = "Full name is required.";
    else if (name.trim().length < 2)        errs.name = "Name must be at least 2 characters.";
    else if (/[^a-zA-Z\s.'"-]/.test(name)) errs.name = "Name must contain letters only.";

    if (!studentId.trim())                  errs.studentId = "Student ID is required.";
    else if (!/^\d{2}-\d{4}-\d{3}$/.test(studentId))
      errs.studentId = "Format must be: 12-3456-789";

    if (!email.trim())                      errs.email = "Email is required.";
    else if (!email.trim().toLowerCase().endsWith("@cit.edu"))
      errs.email = "Only @cit.edu emails are allowed.";
    else if (!/^[a-zA-Z0-9._%+-]+@cit\.edu$/.test(email.trim()))
      errs.email = "Expected: firstname.lastname@cit.edu";

    if (!password)                          errs.password = "Password is required.";
    else if (password.length < 6)           errs.password = "Minimum 6 characters required.";

    if (!confirmPassword)                   errs.confirmPassword = "Please confirm your password.";
    else if (password !== confirmPassword)  errs.confirmPassword = "Passwords do not match.";

    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setGlobalError(null);
    setSuccessMsg(null);
    if (!validate()) return;
    setLoading(true);
    try {
      const { token, user } = await register({ name, studentId, email, password, confirmPassword });
      setAuth(token, user);
      navigate("/pujs", { replace: true });
    } catch (err: any) {
      if (err.confirmed === false)          setSuccessMsg(err.message);
      else if (err.status === 409)          setFieldErrors((p) => ({ ...p, email: "This email is already registered." }));
      else if (err.status === 422 && err.errors) setFieldErrors(err.errors);
      else if (err.status === 400)          setGlobalError("Invalid data. Please check your inputs.");
      else if (err.status === 429)          setGlobalError("Too many attempts. Please wait.");
      else if (!navigator.onLine)           setGlobalError("No internet connection.");
      else setGlobalError(err.message ?? "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", fontFamily: "'Inter', sans-serif" }}>

      {/* ── LEFT PANEL ── */}
      <div
        className="hidden lg:flex"
        style={{
          width: "44%", minHeight: "100vh",
          background: `linear-gradient(160deg, ${MAROON_DARK} 0%, ${MAROON} 50%, #9b1030 100%)`,
          flexDirection: "column", justifyContent: "space-between",
          padding: "48px", position: "relative", overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, rgba(201,162,39,0.15), transparent)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-60px", left: "-60px", width: "260px", height: "260px", borderRadius: "50%", background: "radial-gradient(circle, rgba(201,162,39,0.1), transparent)", pointerEvents: "none" }} />

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", position: "relative", zIndex: 1 }}>
          <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: `linear-gradient(135deg, ${GOLD_LIGHT}, ${GOLD})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", boxShadow: "0 4px 14px rgba(201,162,39,0.4)" }}>🚌</div>
          <div>
            <div style={{ color: "#fff", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "18px" }}>PujRoute</div>
            <div style={{ color: GOLD_LIGHT, fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.85 }}>Cebu Navigator</div>
          </div>
        </div>

        {/* Center */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 14px", borderRadius: "999px", border: "1px solid rgba(201,162,39,0.35)", background: "rgba(201,162,39,0.12)", marginBottom: "24px" }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: GOLD_LIGHT, display: "inline-block" }} />
            <span style={{ color: GOLD_LIGHT, fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Free for CIT-U</span>
          </div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 900, fontSize: "38px", lineHeight: 1.15, color: "#fff", marginBottom: "14px" }}>
            Start your<br />
            <span style={{ color: GOLD_LIGHT }}>journey today.</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "14px", lineHeight: 1.75, maxWidth: "300px", marginBottom: "32px" }}>
            Create your account and get instant access to Cebu's jeepney network.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {[
              { icon: "🔒", label: "Secure CIT-U authentication" },
              { icon: "📍", label: "Accurate route coverage" },
              { icon: "🚀", label: "Free forever for students" },
            ].map((f) => (
              <div key={f.label} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "34px", height: "34px", borderRadius: "10px", background: "rgba(201,162,39,0.15)", border: "1px solid rgba(201,162,39,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", flexShrink: 0 }}>
                  {f.icon}
                </div>
                <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "14px" }}>{f.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ height: "1px", background: "linear-gradient(to right, transparent, rgba(201,162,39,0.3), transparent)", marginBottom: "16px" }} />
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px" }}>
            © {new Date().getFullYear()} PujRoute · CIT-University · Cebu City
          </p>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div style={{
        flex: 1, background: "#ffffff",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "48px 40px", overflowY: "auto",
      }}>
        <div style={{ width: "100%", maxWidth: "400px" }}>

          {/* Mobile logo */}
          <div className="flex lg:hidden" style={{ alignItems: "center", gap: "10px", marginBottom: "28px" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: `linear-gradient(135deg, ${MAROON}, ${MAROON_DARK})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>🚌</div>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, color: MAROON, fontSize: "17px" }}>PujRoute</span>
          </div>

          <div style={{ marginBottom: "28px" }}>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "26px", color: "#0f172a", marginBottom: "6px" }}>
              Create account
            </h2>
            <p style={{ color: "#6b7280", fontSize: "14px" }}>
              Register with your CIT-U student credentials
            </p>
          </div>

          {globalError && (
            <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "12px 16px", borderRadius: "12px", marginBottom: "16px", background: "#fef2f2", border: "1px solid #fecaca", color: "#b91c1c", fontSize: "13px" }}>
              <span>⚠</span> {globalError}
            </div>
          )}
          {successMsg && (
            <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "12px 16px", borderRadius: "12px", marginBottom: "16px", background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#15803d", fontSize: "13px" }}>
              <span>✓</span> {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

            <Field id="name" label="Full Name" placeholder="Juan dela Cruz"
              value={name} onChange={(v) => { setName(v); setFieldErrors((p) => ({ ...p, name: undefined })); }}
              error={fieldErrors.name} disabled={loading} />

            <Field id="studentId" label="Student ID" placeholder="12-3456-789"
              value={studentId} onChange={handleStudentIdChange}
              error={fieldErrors.studentId} hint="Format: 12-3456-789" disabled={loading} />

            <Field id="email" label="CIT Email" type="email" placeholder="juan.cruz@cit.edu"
              value={email} onChange={(v) => { setEmail(v); setFieldErrors((p) => ({ ...p, email: undefined })); }}
              error={fieldErrors.email} hint="Must end with @cit.edu" disabled={loading} />

            {/* Password with strength */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#374151", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPass ? "text" : "password"} placeholder="••••••••"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setFieldErrors((p) => ({ ...p, password: undefined })); }}
                  disabled={loading}
                  style={{ width: "100%", padding: "12px 44px 12px 16px", borderRadius: "12px", border: fieldErrors.password ? "1.5px solid #f87171" : "1.5px solid #e5e7eb", background: fieldErrors.password ? "#fff5f5" : "#f9fafb", fontSize: "14px", outline: "none", fontFamily: "'Inter', sans-serif", transition: "all 0.15s", boxSizing: "border-box" }}
                  onFocus={(e) => { e.target.style.borderColor = MAROON; e.target.style.background = "#fff"; e.target.style.boxShadow = "0 0 0 3px rgba(123,13,30,0.1)"; }}
                  onBlur={(e) => { e.target.style.borderColor = fieldErrors.password ? "#f87171" : "#e5e7eb"; e.target.style.background = fieldErrors.password ? "#fff5f5" : "#f9fafb"; e.target.style.boxShadow = "none"; }}
                  autoComplete="new-password"
                />
                <button type="button" tabIndex={-1} onClick={() => setShowPass((v) => !v)}
                  style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: "16px", opacity: 0.5, padding: "4px" }}>
                  {showPass ? "🙈" : "👁"}
                </button>
              </div>

              {/* Strength bar */}
              {password && (
                <div style={{ display: "flex", alignItems: "center", gap: "8px", paddingTop: "4px" }}>
                  <div style={{ display: "flex", gap: "4px", flex: 1 }}>
                    {[1,2,3,4].map((n) => (
                      <div key={n} style={{ height: "4px", flex: 1, borderRadius: "99px", background: n <= passwordStrength ? strengthConfig[passwordStrength].color : "#e5e7eb", transition: "background 0.25s" }} />
                    ))}
                  </div>
                  <span style={{ fontSize: "11px", fontWeight: 700, minWidth: "38px", textAlign: "right", color: strengthConfig[passwordStrength].color, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {strengthConfig[passwordStrength].label}
                  </span>
                </div>
              )}
              {fieldErrors.password && <p style={{ fontSize: "12px", color: "#dc2626" }}>{fieldErrors.password}</p>}
            </div>

            <Field id="confirmPass" label="Confirm Password"
              type={showPass ? "text" : "password"} placeholder="••••••••"
              value={confirmPassword} onChange={(v) => { setConfirmPassword(v); setFieldErrors((p) => ({ ...p, confirmPassword: undefined })); }}
              error={fieldErrors.confirmPassword} disabled={loading} />

            {/* Submit */}
            <button
              type="submit" disabled={loading}
              style={{
                width: "100%", padding: "14px", borderRadius: "12px", border: "none",
                background: `linear-gradient(135deg, ${GOLD_LIGHT}, ${GOLD})`,
                color: MAROON_DARK,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800, fontSize: "14px", letterSpacing: "0.03em",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.75 : 1,
                boxShadow: loading ? "none" : "0 4px 18px rgba(201,162,39,0.4)",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                transition: "all 0.2s", marginTop: "4px",
              }}
            >
              {loading ? (
                <>
                  <span style={{ width: "16px", height: "16px", border: "2px solid rgba(74,8,16,0.2)", borderTopColor: MAROON_DARK, borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />
                  Creating account…
                </>
              ) : "Create account →"}
            </button>

          </form>

          <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "20px 0" }}>
            <div style={{ flex: 1, height: "1px", background: "#f1f5f9" }} />
            <span style={{ color: "#9ca3af", fontSize: "12px" }}>or</span>
            <div style={{ flex: 1, height: "1px", background: "#f1f5f9" }} />
          </div>

          <p style={{ textAlign: "center", fontSize: "14px", color: "#6b7280" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: MAROON, fontWeight: 700, textDecoration: "none", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Sign in
            </Link>
          </p>

        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input::placeholder { color: #9ca3af; }
        input:disabled { opacity: 0.6; cursor: not-allowed; }
      `}</style>
    </div>
  );
}
