import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../shared/context/AuthContext";
import {
  getProfile,
  updateProfile,
  updatePassword,
  uploadAvatar,
} from "../shared/api/auth";
import "./ProfilePage.css";

export function ProfilePage() {
  const { user }   = useAuth();
  const navigate   = useNavigate();

  const [fullName,     setFullName]     = useState("");
  const [username,     setUsername]     = useState("");
  const [avatarUrl,    setAvatarUrl]    = useState("");
  const [newPass,      setNewPass]      = useState("");
  const [confirmPass,  setConfirmPass]  = useState("");
  const [loading,      setLoading]      = useState(true);
  const [saving,       setSaving]       = useState(false);
  const [msg,          setMsg]          = useState<{ text: string; ok: boolean } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    getProfile(user.id)
      .then((data) => {
        if (data) {
          setFullName(data.full_name   ?? "");
          setUsername(data.username    ?? "");
          setAvatarUrl(data.avatar_url ?? "");
        }
      })
      .catch(() => {
        // No profile row yet — show empty form
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user]);

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

  if (loading) {
    return (
      <div className="pf-page">
        <nav className="pf-nav">
          <div className="pf-nav__inner">
            <div className="pf-nav__brand" onClick={() => navigate("/home")}>
              <span>🚌</span>
              <span className="pf-nav__name">PujRoute</span>
            </div>
            <div className="pf-nav__links">
              <button className="pf-nav__link" onClick={() => navigate("/home")}>Home</button>
              <button className="pf-nav__link" onClick={() => navigate("/pujs")}>PUJ List</button>
              <button className="pf-nav__link pf-nav__link--active">Profile</button>
              <button className="pf-nav__link" onClick={() => navigate("/login")}>Logout</button>
            </div>
          </div>
        </nav>
        <div className="pf-loading">
          <div className="pf-loading__spinner" />
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pf-page">

      {/* ── Navbar ── */}
      <nav className="pf-nav">
        <div className="pf-nav__inner">
          <div className="pf-nav__brand" onClick={() => navigate("/home")}>
            <span>🚌</span>
            <span className="pf-nav__name">PujRoute</span>
          </div>
          <div className="pf-nav__links">
            <button className="pf-nav__link" onClick={() => navigate("/home")}>Home</button>
            <button className="pf-nav__link" onClick={() => navigate("/pujs")}>PUJ List</button>
            <button className="pf-nav__link pf-nav__link--active">Profile</button>
            <button className="pf-nav__link" onClick={() => navigate("/login")}>Logout</button>
          </div>
        </div>
      </nav>

      <div className="pf-content">

        {/* ── Avatar Section ── */}
        <div className="pf-avatar-section">
          <div className="pf-avatar" onClick={() => fileRef.current?.click()}>
            {avatarUrl
              ? <img src={avatarUrl} alt="avatar" className="pf-avatar__img" />
              : <span className="pf-avatar__placeholder">
                  {fullName?.[0]?.toUpperCase() ?? user?.email?.[0]?.toUpperCase() ?? "?"}
                </span>
            }
            <div className="pf-avatar__overlay">📷</div>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleAvatarChange}
          />
          <div className="pf-avatar__info">
            <h2 className="pf-avatar__name">{fullName || "Your Name"}</h2>
            <p className="pf-avatar__email">{user?.email}</p>
            <p className="pf-avatar__hint">Click photo to change</p>
          </div>
        </div>

        {/* ── Toast ── */}
        {msg && (
          <div className={`pf-toast ${msg.ok ? "pf-toast--ok" : "pf-toast--err"}`}>
            {msg.ok ? "✅" : "❌"} {msg.text}
          </div>
        )}

        {/* ── Edit Profile ── */}
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
              <label>Email</label>
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

        {/* ── Change Password ── */}
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
            <button type="submit" className="pf-btn" disabled={saving}>
              {saving ? "Updating..." : "Update Password"}
            </button>
          </form>
        </section>

      </div>
    </div>
  );
}
