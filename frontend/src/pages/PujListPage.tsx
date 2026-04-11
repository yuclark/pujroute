import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPujs } from "../shared/api/puj";
import type { PujRoute } from "../types/puj";
import "./PujListPage.css";

function SkeletonGrid() {
  return (
    <div className="pl-grid">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="pl-skeleton" />
      ))}
    </div>
  );
}

export function PujListPage() {
  const [query, setQuery]     = useState("");
  const [pujs, setPujs]       = useState<PujRoute[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);
  const navigate              = useNavigate();

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPujs(query.trim() || undefined);
        if (!cancelled) setPujs(data);
      } catch {
        if (!cancelled) setError("Failed to load PUJ routes.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [query]);

  return (
    <div className="pl-page">

      {/* ── Navbar ── */}
      <nav className="pl-nav">
        <div className="pl-nav__inner">
          <div className="pl-nav__brand" onClick={() => navigate("/home")}>
            <span className="pl-nav__logo">🚌</span>
            <span className="pl-nav__name">PujRoute</span>
          </div>
          <div className="pl-nav__links">
            <button className="pl-nav__link" onClick={() => navigate("/home")}>Home</button>
            <button className="pl-nav__link pl-nav__link--active" onClick={() => navigate("/pujs")}>PUJ List</button>
            <button className="hp-nav__link" onClick={() => navigate("/profile")}>Profile</button>
            <button className="pl-nav__link" onClick={() => navigate("/login")}>Logout</button>
          </div>
        </div>
      </nav>

      {/* ── Banner ── */}
      <div className="pl-banner">
        <div className="pl-banner__inner">
          <div className="pl-banner__text">
            <span className="pl-banner__eyebrow">Cebu City Transit</span>
            <h1 className="pl-banner__title">PUJ Routes</h1>
            <p className="pl-banner__sub">
              Find your jeepney route — search by code, origin, or destination.
            </p>
          </div>
          {!loading && !error && (
            <div className="pl-banner__stat">
              <span className="pl-banner__stat-num">{pujs.length}</span>
              <span className="pl-banner__stat-label">Active Routes</span>
            </div>
          )}
        </div>

        <div className="pl-banner__search-wrap">
          <div className="pl-search">
            <svg className="pl-search__icon" viewBox="0 0 20 20" fill="none">
              <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="2"/>
              <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              className="pl-search__input"
              placeholder="Search route code, origin or destination..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button className="pl-search__clear" onClick={() => setQuery("")}>✕</button>
            )}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="pl-content">

        {loading && <SkeletonGrid />}

        {error && (
          <div className="pl-empty">
            <div className="pl-empty__icon">⚠️</div>
            <p className="pl-empty__text">{error}</p>
          </div>
        )}

        {!loading && !error && pujs.length === 0 && (
          <div className="pl-empty">
            <div className="pl-empty__icon">🔍</div>
            <p className="pl-empty__text">No routes found for <strong>"{query}"</strong></p>
            <button className="pl-empty__btn" onClick={() => setQuery("")}>Clear search</button>
          </div>
        )}

        {!loading && !error && pujs.length > 0 && (
          <div className="pl-grid">
            {pujs.map((puj) => (
              <button
                key={puj.code}
                className="pl-card"
                onClick={() => navigate(`/pujs/${puj.code}`)}
              >
                <div className="pl-card__top">
                  <span className="pl-card__badge">{puj.code}</span>
                  <div className="pl-card__arrow">
                    <svg viewBox="0 0 20 20" fill="none" width="20" height="20">
                      <path d="M7 5l5 5-5 5" stroke="currentColor" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <div className="pl-card__body">
                  <p className="pl-card__origin">{puj.origin}</p>
                  <div className="pl-card__arrow-down">
                    <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
                      <path d="M10 4v12M10 16l-4-4M10 16l4-4"
                        stroke="currentColor" strokeWidth="1.8"
                        strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="pl-card__destination">{puj.destination}</p>
                </div>
                {puj.otherRoutes && (
                  <div className="pl-card__footer">
                    <span className="pl-card__via">via {puj.otherRoutes}</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
