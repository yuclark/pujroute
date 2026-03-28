import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const POPULAR_ROUTES = [
  { code: "01C", route: "Bulacao → Ayala",    daily: "1.2k", desc: "Via Colon & Carbon" },
  { code: "04L", route: "SM → Talamban",      daily: "980",  desc: "Via Lahug & Plaza Housing" },
  { code: "06B", route: "Colon → Capitol",    daily: "850",  desc: "Via Guadalupe & Jones" },
];

export function HomePage() {
  const [from, setFrom] = useState("");
  const [to, setTo]     = useState("");
  const navigate        = useNavigate();

  function handleSearch() {
    if (from.trim() || to.trim()) {
      navigate(`/pujs?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`);
    } else {
      navigate("/pujs");
    }
  }

  return (
    <div className="hp">

      {/* ── Navbar ── */}
      <nav className="hp-nav">
        <div className="hp-nav__inner">
          <div className="hp-nav__brand">
            <div className="hp-nav__logo">🚌</div>
            <span className="hp-nav__name">PUJ Route</span>
          </div>
          <div className="hp-nav__links">
            <button className="hp-nav__link hp-nav__link--active" onClick={() => navigate("/home")}>Home</button>
            <button className="hp-nav__link" onClick={() => navigate("/pujs")}>Routes</button>
            <button className="hp-nav__link" onClick={() => navigate("/profile")}>Profile</button>
            <button className="hp-nav__link" onClick={() => navigate("/login")}>Logout</button>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="hp-hero">
        <div className="hp-hero__inner">
          <p className="hp-hero__eyebrow">Cebu Jeepney Navigator</p>
          <h1 className="hp-hero__title">Find Your<br /><span className="hp-hero__accent">Route</span></h1>
          <p className="hp-hero__sub">
            Navigate Cebu City with ease — search PUJ routes, view stops,
            and plan your jeepney ride in seconds.
          </p>

          {/* ── Search Card ── */}
          <div className="hp-search">
            <div className="hp-search__row">
              <div className="hp-search__field">
                <label className="hp-search__label">From</label>
                <div className="hp-search__wrap">
                  <svg className="hp-search__icon" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.8"/>
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="1.8" fill="none"/>
                  </svg>
                  <input
                    className="hp-search__input"
                    type="text"
                    placeholder="Enter starting point"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  />
                </div>
              </div>

              <div className="hp-search__arrow">↓</div>

              <div className="hp-search__field">
                <label className="hp-search__label">To</label>
                <div className="hp-search__wrap">
                  <svg className="hp-search__icon" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.8"/>
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="1.8" fill="none"/>
                  </svg>
                  <input
                    className="hp-search__input"
                    type="text"
                    placeholder="Enter destination"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  />
                </div>
              </div>
            </div>

            <button className="hp-search__btn" onClick={handleSearch}>
              <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
                <circle cx="9" cy="9" r="6" stroke="#fff" strokeWidth="1.8"/>
                <path d="M13.5 13.5L17 17" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              Search Routes
            </button>
          </div>
        </div>
      </section>

      {/* ── Popular Routes ── */}
      <section className="hp-section">
        <div className="hp-section__inner">
          <div className="hp-section__head">
            <h2 className="hp-section__title">Popular Routes</h2>
            <button className="hp-section__all" onClick={() => navigate("/pujs")}>
              View all →
            </button>
          </div>

          <div className="hp-routes">
            {POPULAR_ROUTES.map((r) => (
              <button
                key={r.code}
                className="hp-route-card"
                onClick={() => navigate(`/pujs/${r.code}`)}
              >
                <div className="hp-route-card__top">
                  <span className="hp-route-card__badge">{r.code}</span>
                  <span className="hp-route-card__daily">{r.daily} daily</span>
                </div>
                <p className="hp-route-card__name">{r.route}</p>
                <p className="hp-route-card__desc">{r.desc}</p>
                <span className="hp-route-card__cta">View Details →</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quick Links ── */}
      <section className="hp-section hp-section--alt">
        <div className="hp-section__inner">
          <h2 className="hp-section__title">Quick Access</h2>
          <div className="hp-quick">
            <button className="hp-quick-card" onClick={() => navigate("/pujs")}>
              <span className="hp-quick-card__icon">🗺️</span>
              <span className="hp-quick-card__label">All Routes</span>
              <span className="hp-quick-card__sub">Browse all PUJ codes</span>
            </button>
            <button className="hp-quick-card" onClick={() => navigate("/pujs")}>
              <span className="hp-quick-card__icon">⭐</span>
              <span className="hp-quick-card__label">Favorites</span>
              <span className="hp-quick-card__sub">Your saved routes</span>
            </button>
            <button className="hp-quick-card" onClick={() => navigate("/pujs")}>
              <span className="hp-quick-card__icon">🕐</span>
              <span className="hp-quick-card__label">Recent</span>
              <span className="hp-quick-card__sub">Last viewed routes</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="hp-footer">
        <p>© 2026 PujRoute · Cebu Jeepney Navigator</p>
      </footer>

    </div>
  );
}
