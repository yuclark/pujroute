import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../shared/context/AuthContext";
import { getFavoriteCodes, getRecentRoutes } from "../shared/lib/routeStorage";
import {
  getProfile,
  updateProfile,
  updatePassword,
  uploadAvatar,
} from "../shared/api/auth";
import "./ProfilePage.css";


export function ProfilePage() {
  const { user }  = useAuth();
  const navigate  = useNavigate();
  const { logout } = useAuth();

  const [fullName,      setFullName]      = useState("");
  const [username,      setUsername]      = useState("");
  const [avatarUrl,     setAvatarUrl]     = useState("");
  const [newPass,       setNewPass]       = useState("");
  const [confirmPass,   setConfirmPass]   = useState("");
  const [loading,       setLoading]       = useState(true);
  const [saving,        setSaving]        = useState(false);
  const [msg,           setMsg]           = useState<{ text: string; ok: boolean } | null>(null);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [recentCount,   setRecentCount]   = useState(0);
  const [activeTab,     setActiveTab]     = useState<"profile" | "password">("profile");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    getProfile(user.id)
      .then((data) => {
        if (data) {
          setFullName(data.full_name   ?? "");
          setUsername(data.username    ?? "");
          setAvatarUrl(data.avatar_url ?? "");
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user]);

  useEffect(() => {
    setFavoriteCount(getFavoriteCodes().length);
    setRecentCount(getRecentRoutes().length);
  }, []);

  function notify(text: string, ok = true) {
    setMsg({ text, ok });
    setTimeout(() => setMsg(null), 3000);
  }

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    try {
      await updateProfile(user.id, { full_name: fullName, username });
      notify("Profile updated successfully!");
    } catch (err: any) {
      notify(err.message ?? "Failed to update profile.", false);
    } finally {
      setSaving(false);
    }
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    if (newPass !== confirmPass) return notify("Passwords do not match.", false);
    if (newPass.length < 6)      return notify("Minimum 6 characters required.", false);
    setSaving(true);
    try {
      await updatePassword(newPass);
      notify("Password changed successfully!");
      setNewPass("");
      setConfirmPass("");
    } catch (err: any) {
      notify(err.message ?? "Failed to change password.", false);
    } finally {
      setSaving(false);
    }
  }

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setSaving(true);
    try {
      const url = await uploadAvatar(user.id, file);
      setAvatarUrl(url);
      notify("Profile photo updated!");
    } catch (err: any) {
      notify(err.message ?? "Failed to upload photo.", false);
    } finally {
      setSaving(false);
    }
  }

  const Navbar = () => (
    <nav className="pf-nav">
      <div className="pf-nav__inner">
        <div className="pf-nav__brand" onClick={() => navigate("/home")}>
          <span>🚌</span>
          <span className="pf-nav__name">PUJ Route</span>
        </div>
        <div className="pf-nav__links">
          <button className="pf-nav__link" onClick={() => navigate("/home")}>Home</button>
          <button className="pf-nav__link" onClick={() => navigate("/pujs")}>Routes</button>
          <button className="pf-nav__link pf-nav__link--active">Profile</button>
          <button className="hp-nav__link" onClick={async () => { await logout(); navigate("/login"); }}>Logout</button>
        </div>
      </div>
    </nav>
  );

  if (loading) {
    return (
      <div className="pf-page">
        <Navbar />
        <div className="pf-loading">
          <div className="pf-loading__spinner" />
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pf-page">
      <Navbar />

      {/* ── Hero Banner ── */}
      <div className="pf-hero">
        <div className="pf-hero__inner">
          <div className="pf-avatar" onClick={() => fileRef.current?.click()}>
            {avatarUrl
              ? <img src={avatarUrl} alt="avatar" className="pf-avatar__img" />
              : <span className="pf-avatar__placeholder">
                  {fullName?.[0]?.toUpperCase() ?? user?.email?.[0]?.toUpperCase() ?? "?"}
                </span>
            }
            <div className="pf-avatar__overlay">
              <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
                <path d="M12 20h9" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleAvatarChange} />

          <div className="pf-hero__info">
            <h1 className="pf-hero__name">{fullName || "Your Name"}</h1>
            <p className="pf-hero__email">{user?.email}</p>
            <p className="pf-hero__hint">Click photo to change</p>
          </div>
        </div>
      </div>

      <div className="pf-content">

        {/* ── Stats Row ── */}
        <div className="pf-stats">
          <div className="pf-stat-card">
            <div className="pf-stat-card__icon">⭐</div>
            <div className="pf-stat-card__body">
              <span className="pf-stat-card__num">{favoriteCount}</span>
              <span className="pf-stat-card__label">Saved Routes</span>
              <span className="pf-stat-card__sub">Routes saved to favorites</span>
            </div>
          </div>
          <div className="pf-stat-card">
            <div className="pf-stat-card__icon">🕐</div>
            <div className="pf-stat-card__body">
              <span className="pf-stat-card__num">{recentCount}</span>
              <span className="pf-stat-card__label">Recent Views</span>
              <span className="pf-stat-card__sub">Routes you looked up lately</span>
            </div>
          </div>
        </div>

        {/* ── Toast ── */}
        {msg && (
          <div className={`pf-toast ${msg.ok ? "pf-toast--ok" : "pf-toast--err"}`}>
            {msg.ok ? "✅" : "❌"} {msg.text}
          </div>
        )}

        {/* ── Tabs ── */}
        <div className="pf-tabs">
          <button
            className={`pf-tabs__item${activeTab === "profile" ? " pf-tabs__item--active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
              <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Edit Profile
          </button>
          <button
            className={`pf-tabs__item${activeTab === "password" ? " pf-tabs__item--active" : ""}`}
            onClick={() => setActiveTab("password")}
          >
            <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
              <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2"/>
              <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Change Password
          </button>
        </div>

        {/* ── Edit Profile Panel ── */}
        {activeTab === "profile" && (
          <section className="pf-card">
            <div className="pf-card__head">
              <h3 className="pf-card__title">Edit Profile</h3>
              <p className="pf-card__desc">Update your display name and username</p>
            </div>
            <form onSubmit={handleSaveProfile} className="pf-form">
              <div className="pf-form__field">
                <label>Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              <div className="pf-form__field">
                <label>Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Choose a username"
                />
              </div>
              <div className="pf-form__field">
                <label>Email <span className="pf-form__badge">Cannot be changed</span></label>
                <input
                  type="email"
                  value={user?.email ?? ""}
                  disabled
                  className="pf-form__input--disabled"
                />
              </div>
              <button type="submit" className="pf-btn" disabled={saving}>
                {saving ? "Saving..." : "Save Profile"}
              </button>
            </form>
          </section>
        )}

        {/* ── Change Password Panel ── */}
        {activeTab === "password" && (
          <section className="pf-card">
            <div className="pf-card__head">
              <h3 className="pf-card__title">Change Password</h3>
              <p className="pf-card__desc">Choose a strong password of at least 6 characters</p>
            </div>
            <form onSubmit={handleChangePassword} className="pf-form">
              <div className="pf-form__field">
                <label>New Password</label>
                <input
                  type="password"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  placeholder="Min. 6 characters"
                />
              </div>
              <div className="pf-form__field">
                <label>Confirm Password</label>
                <input
                  type="password"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  placeholder="Repeat new password"
                />
              </div>

              {/* Password strength indicator */}
              {newPass.length > 0 && (
                <div className="pf-strength">
                  <div className="pf-strength__bars">
                    <div className={`pf-strength__bar ${newPass.length >= 1 ? "pf-strength__bar--active" : ""}`} />
                    <div className={`pf-strength__bar ${newPass.length >= 6 ? "pf-strength__bar--active" : ""}`} />
                    <div className={`pf-strength__bar ${newPass.length >= 10 ? "pf-strength__bar--active" : ""}`} />
                    <div className={`pf-strength__bar ${newPass.length >= 14 ? "pf-strength__bar--active" : ""}`} />
                  </div>
                  <span className="pf-strength__label">
                    {newPass.length < 6 ? "Too short" : newPass.length < 10 ? "Fair" : newPass.length < 14 ? "Good" : "Strong"}
                  </span>
                </div>
              )}

              <button type="submit" className="pf-btn" disabled={saving}>
                {saving ? "Updating..." : "Update Password"}
              </button>
            </form>
          </section>
        )}

      </div>

      {/* ── Footer ── */}
      <footer className="pf-footer">
        <p>© 2026 PujRoute · Cebu Jeepney Navigator</p>
      </footer>

    </div>
  );
}