import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../shared/api/auth";
import { useAuth } from "../shared/context/AuthContext";

interface FieldErrors {
  email?: string;
  password?: string;
}

const MAROON = "#7b0d1e";
const MAROON_DARK = "#4a0810";
const GOLD = "#c9a227";
const GOLD_LIGHT = "#e8c84a";

export function LoginPage() {
  const navigate    = useNavigate();
  const { setAuth } = useAuth();

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [loading, setLoading]         = useState(false);

  function validate(): boolean {
    const errs: FieldErrors = {};
    if (!email.trim())
      errs.email = "Email is required.";
    else if (!email.trim().toLowerCase().endsWith("@cit.edu"))
      errs.email = "Only @cit.edu emails are allowed.";
    if (!password)
      errs.password = "Password is required.";
    else if (password.length < 6)
      errs.password = "Password must be at least 6 characters.";
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setGlobalError(null);
    if (!validate()) return;
    setLoading(true);
    try {
      const { token, user } = await login({ email, password });
      setAuth(token, user);
      navigate("/home", { replace: true });
    } catch (err: any) {
      if (err.status === 401)       setGlobalError("Incorrect email or password.");
      else if (err.status === 404)  setGlobalError("No account found with that email.");
      else if (err.status === 429)  setGlobalError("Too many attempts. Please wait.");
      else if (!navigator.onLine)   setGlobalError("No internet connection.");
      else setGlobalError(err.message ?? "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", fontFamily: "'Inter', sans-serif" }}>

      {/* ── LEFT PANEL ── */}
      <div style={{
        width: "50%",
        minHeight: "100vh",
        background: `linear-gradient(160deg, ${MAROON_DARK} 0%, ${MAROON} 50%, #9b1030 100%)`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "48px",
        position: "relative",
        overflow: "hidden",
      }}
        className="hidden lg:flex"
      >
        {/* Decorative blobs */}
        <div style={{
          position: "absolute", top: "-80px", right: "-80px",
          width: "320px", height: "320px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,162,39,0.15), transparent)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "-60px", left: "-60px",
          width: "280px", height: "280px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,162,39,0.1), transparent)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: "50%", right: "40px",
          width: "160px", height: "160px", borderRadius: "50%",
          border: `1px solid rgba(201,162,39,0.2)`,
          transform: "translateY(-50%)",
          pointerEvents: "none",
        }} />

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", position: "relative", zIndex: 1 }}>
          <div style={{
            width: "44px", height: "44px", borderRadius: "12px",
            background: `linear-gradient(135deg, ${GOLD_LIGHT}, ${GOLD})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "22px", boxShadow: "0 4px 14px rgba(201,162,39,0.4)",
          }}>
            🚌
          </div>
          <div>
            <div style={{ color: "#fff", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "18px", letterSpacing: "0.02em" }}>
              PUJ Route
            </div>
            <div style={{ color: GOLD_LIGHT, fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.85 }}>
              Cebu Navigator
            </div>
          </div>
        </div>

        {/* Center Content */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "6px 14px", borderRadius: "999px",
            border: `1px solid rgba(201,162,39,0.35)`,
            background: "rgba(201,162,39,0.12)",
            marginBottom: "24px",
          }}>
            <span style={{
              width: "7px", height: "7px", borderRadius: "50%",
              background: GOLD_LIGHT, display: "inline-block",
              animation: "pulse 2s infinite",
            }} />
            <span style={{ color: GOLD_LIGHT, fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              CIT Exclusive
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 900,
            fontSize: "42px",
            lineHeight: 1.15,
            color: "#fff",
            marginBottom: "16px",
          }}>
            Navigate Cebu<br />
            <span style={{ color: GOLD_LIGHT }}>with confidence.</span>
          </h1>

          <p style={{
            color: "rgba(255,255,255,0.65)",
            fontSize: "14px",
            lineHeight: 1.75,
            maxWidth: "320px",
            marginBottom: "36px",
          }}>
            Your trusted jeepney route companion, built exclusively for CIT-University students and faculty.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {[
              { icon: "🗺", label: "Real-time jeepney routes" },
              { icon: "🎓", label: "CIT-U exclusive access" },
              { icon: "⚡", label: "Instant route search" },
            ].map((f) => (
              <div key={f.label} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{
                  width: "34px", height: "34px", borderRadius: "10px",
                  background: "rgba(201,162,39,0.15)",
                  border: "1px solid rgba(201,162,39,0.25)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "15px", flexShrink: 0,
                }}>
                  {f.icon}
                </div>
                <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "14px" }}>{f.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ height: "1px", background: "linear-gradient(to right, transparent, rgba(201,162,39,0.3), transparent)", marginBottom: "16px" }} />
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px" }}>
            © {new Date().getFullYear()} PujRoute · CIT-University · Cebu City
          </p>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div style={{
        flex: 1,
        minHeight: "100vh",
        background: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 40px",
      }}>
        <div style={{ width: "100%", maxWidth: "400px" }}>

          {/* Mobile logo */}
          <div className="flex lg:hidden" style={{ alignItems: "center", gap: "10px", marginBottom: "32px" }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "10px",
              background: `linear-gradient(135deg, ${MAROON}, ${MAROON_DARK})`,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px",
            }}>🚌</div>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, color: MAROON, fontSize: "17px" }}>
              PujRoute
            </span>
          </div>

          {/* Heading */}
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800, fontSize: "28px",
              color: "#0f172a", marginBottom: "6px",
            }}>
              Welcome back
            </h2>
            <p style={{ color: "#6b7280", fontSize: "14px", lineHeight: 1.5 }}>
              Sign in with your CIT-U institutional account
            </p>
          </div>

          {/* Global error */}
          {globalError && (
            <div style={{
              display: "flex", alignItems: "flex-start", gap: "10px",
              padding: "12px 16px", borderRadius: "12px", marginBottom: "20px",
              background: "#fef2f2", border: "1px solid #fecaca", color: "#b91c1c",
              fontSize: "13px",
            }}>
              <span>⚠</span> {globalError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "18px" }}>

            {/* Email field */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#374151", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                CIT Email
              </label>
              <input
                type="email"
                placeholder="juan.cruz@cit.edu"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setFieldErrors((p) => ({ ...p, email: undefined })); }}
                disabled={loading}
                style={{
                  width: "100%", padding: "12px 16px", borderRadius: "12px",
                  border: fieldErrors.email ? "1.5px solid #f87171" : "1.5px solid #e5e7eb",
                  background: fieldErrors.email ? "#fff5f5" : "#f9fafb",
                  fontSize: "14px", outline: "none", fontFamily: "'Inter', sans-serif",
                  transition: "all 0.15s", boxSizing: "border-box",
                }}
                onFocus={(e) => { e.target.style.borderColor = MAROON; e.target.style.background = "#fff"; e.target.style.boxShadow = `0 0 0 3px rgba(123,13,30,0.1)`; }}
                onBlur={(e) => { e.target.style.borderColor = fieldErrors.email ? "#f87171" : "#e5e7eb"; e.target.style.background = fieldErrors.email ? "#fff5f5" : "#f9fafb"; e.target.style.boxShadow = "none"; }}
                autoComplete="email"
              />
              {fieldErrors.email && <p style={{ fontSize: "12px", color: "#dc2626" }}>{fieldErrors.email}</p>}
            </div>

            {/* Password field */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#374151", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setFieldErrors((p) => ({ ...p, password: undefined })); }}
                  disabled={loading}
                  style={{
                    width: "100%", padding: "12px 44px 12px 16px", borderRadius: "12px",
                    border: fieldErrors.password ? "1.5px solid #f87171" : "1.5px solid #e5e7eb",
                    background: fieldErrors.password ? "#fff5f5" : "#f9fafb",
                    fontSize: "14px", outline: "none", fontFamily: "'Inter', sans-serif",
                    transition: "all 0.15s", boxSizing: "border-box",
                  }}
                  onFocus={(e) => { e.target.style.borderColor = MAROON; e.target.style.background = "#fff"; e.target.style.boxShadow = `0 0 0 3px rgba(123,13,30,0.1)`; }}
                  onBlur={(e) => { e.target.style.borderColor = fieldErrors.password ? "#f87171" : "#e5e7eb"; e.target.style.background = fieldErrors.password ? "#fff5f5" : "#f9fafb"; e.target.style.boxShadow = "none"; }}
                  autoComplete="current-password"
                />
                <button
                  type="button" tabIndex={-1}
                  onClick={() => setShowPass((v) => !v)}
                  style={{
                    position: "absolute", right: "12px", top: "50%",
                    transform: "translateY(-50%)", background: "none",
                    border: "none", cursor: "pointer", fontSize: "16px",
                    opacity: 0.5, padding: "4px",
                  }}
                >
                  {showPass ? "🙈" : "👁"}
                </button>
              </div>
              {fieldErrors.password && <p style={{ fontSize: "12px", color: "#dc2626" }}>{fieldErrors.password}</p>}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%", padding: "14px",
                borderRadius: "12px", border: "none",
                background: `linear-gradient(135deg, ${GOLD_LIGHT}, ${GOLD})`,
                color: MAROON_DARK,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800, fontSize: "14px",
                letterSpacing: "0.03em",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.75 : 1,
                boxShadow: loading ? "none" : "0 4px 18px rgba(201,162,39,0.4)",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                transition: "all 0.2s",
                marginTop: "4px",
              }}
            >
              {loading ? (
                <>
                  <span style={{
                    width: "16px", height: "16px",
                    border: `2px solid rgba(74,8,16,0.2)`,
                    borderTopColor: MAROON_DARK,
                    borderRadius: "50%",
                    display: "inline-block",
                    animation: "spin 0.7s linear infinite",
                  }} />
                  Signing in…
                </>
              ) : "Sign in →"}
            </button>

          </form>

          <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "24px 0" }}>
            <div style={{ flex: 1, height: "1px", background: "#f1f5f9" }} />
            <span style={{ color: "#9ca3af", fontSize: "12px" }}>or</span>
            <div style={{ flex: 1, height: "1px", background: "#f1f5f9" }} />
          </div>

          <p style={{ textAlign: "center", fontSize: "14px", color: "#6b7280" }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: MAROON, fontWeight: 700, textDecoration: "none", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Create one
            </Link>
          </p>

        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        input::placeholder { color: #9ca3af; }
        input:disabled { opacity: 0.6; cursor: not-allowed; }
        button:hover:not(:disabled) { filter: brightness(1.05); }
      `}</style>
    </div>
  );
}
