import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPujs } from "../shared/api/puj";
import type { PujRoute } from "../shared/types/puj";
import "./HomePage.css";
import { useAuth } from "../shared/context/AuthContext";

const POPULAR_ROUTES = [
  {
    code: "01K",
    route: "V Urgello Street → Parkmall",
    desc: "Via Colon, SM City Cebu & North Bus Terminal",
  },
  {
    code: "02B",
    route: "Cebu City Medical Center → Pier 3",
    desc: "Via Elizabeth Mall, Colon & Pier 1",
  },
  {
    code: "03B",
    route: "Sindulan Street → Metro Colon",
    desc: "Via Fuente Osmeña, Mango Square & Abellana",
  },
];

export function HomePage() {
  const [routes, setRoutes] = useState<PujRoute[]>([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [error, setError] = useState("");
  const [loadingRoutes, setLoadingRoutes] = useState(true);
  const navigate = useNavigate();
  const { logout } = useAuth(); 

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await fetchPujs();
        if (!cancelled) setRoutes(data);
      } catch {
        if (!cancelled) setError("Unable to load route locations. Please try again later.");
      } finally {
        if (!cancelled) setLoadingRoutes(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  const allFromLocations = useMemo(() => {
    const locationSet = new Set<string>();
    routes.forEach((route) => {
      locationSet.add(route.origin);
      route.stops?.forEach((stop) => locationSet.add(stop));
    });
    return Array.from(locationSet).sort();
  }, [routes]);

  const allToLocations = useMemo(() => {
    const locationSet = new Set<string>();
    routes.forEach((route) => {
      locationSet.add(route.destination);
      route.stops?.forEach((stop) => locationSet.add(stop));
    });
    return Array.from(locationSet).sort();
  }, [routes]);

  function handleSearch() {
    setError("");

    if (!from || !to) {
      setError("Please select both starting point and destination from the list.");
      return;
    }

    if (from === to) {
      setError("Starting point and destination cannot be the same.");
      return;
    }

    const exactMatch = routes.find(
      (route) => route.origin === from && route.destination === to
    );

    if (exactMatch) {
      navigate(`/pujs/${exactMatch.code}`, { state: { from, to } });
      return;
    }

    const stopMatch = routes.find((route) => {
      const stops = route.stops ?? [];
      const fromIndex = stops.findIndex(
        (s) => s === from || route.origin === from
      );
      const toIndex = stops.findIndex(
        (s) => s === to || route.destination === to
      );
      return fromIndex !== -1 && toIndex !== -1 && fromIndex < toIndex;
    });

    if (stopMatch) {
      navigate(`/pujs/${stopMatch.code}`, { state: { from, to } });
    } else {
      setError(`No matching route found for ${from} → ${to}. Please choose another valid combination.`);
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
            <button className="hp-nav__link" onClick={async () => { await logout(); navigate("/login"); }}>Logout</button>
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
                  <select
                    className="hp-search__select"
                    value={from}
                    disabled={loadingRoutes}
                    onChange={(e) => { setFrom(e.target.value); setError(""); }}
                  >
                    <option value="">Select starting point</option>
                    {allFromLocations.map((location) => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
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
                  <select
                    className="hp-search__select"
                    value={to}
                    disabled={loadingRoutes}
                    onChange={(e) => { setTo(e.target.value); setError(""); }}
                  >
                    <option value="">Select destination</option>
                    {allToLocations.map((location) => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {error && <p className="hp-search__error">{error}</p>}

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
            <button className="hp-quick-card" onClick={() => navigate("/pujs?view=favorites")}>
              <span className="hp-quick-card__icon">⭐</span>
              <span className="hp-quick-card__label">Favorites</span>
              <span className="hp-quick-card__sub">Your saved routes</span>
            </button>
            <button className="hp-quick-card" onClick={() => navigate("/pujs?view=recent")}>
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