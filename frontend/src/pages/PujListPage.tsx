import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchPujs } from "../shared/api/puj";
import {
  addRecentRoute,
  getFavoriteCodes,
  getRecentRoutes,
  toggleFavoriteCode,
} from "../shared/lib/routeStorage";
import { useAuth } from "../shared/context/AuthContext";

type PujRoute = {
  code: string;
  origin: string;
  destination: string;
  otherRoutes?: string;
  stops?: string[];
};

type ViewFilter = "all" | "favorites" | "recent";

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
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const queryView = (searchParams.get("view") as ViewFilter) || "all";

  const [view, setView] = useState<ViewFilter>(queryView);
  const [query, setQuery] = useState("");
  const [routes, setRoutes] = useState<PujRoute[]>([]);
  const [favoriteCodes, setFavoriteCodes] = useState<string[]>([]);
  const [recentRoutes, setRecentRoutes] = useState<PujRoute[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setView(queryView);
  }, [queryView]);

  useEffect(() => {
    setFavoriteCodes(getFavoriteCodes());
    setRecentRoutes(getRecentRoutes());
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPujs(query.trim() || undefined);
        if (!cancelled) setRoutes(data);
      } catch {
        if (!cancelled) setError("Failed to load PUJ routes.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [query]);

  const allStops = useMemo(() => {
    const stopSet = new Set<string>();
    routes.forEach((route) => route.stops?.forEach((stop) => stopSet.add(stop)));
    return Array.from(stopSet).sort();
  }, [routes]);

  const favoriteRoutes = useMemo(
    () => routes.filter((route) => favoriteCodes.includes(route.code)),
    [routes, favoriteCodes]
  );

  const visibleRoutes = useMemo(() => {
    let list =
      view === "favorites"
        ? favoriteRoutes
        : view === "recent"
        ? recentRoutes
        : routes;
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (route) =>
          route.code.toLowerCase().includes(q) ||
          route.origin.toLowerCase().includes(q) ||
          route.destination.toLowerCase().includes(q) ||
          (route.otherRoutes?.toLowerCase().includes(q) ?? false) ||
          (route.stops?.some((stop) => stop.toLowerCase().includes(q)) ?? false)
      );
    }
    return list;
  }, [view, routes, favoriteRoutes, recentRoutes, query]);

  const activeLabel =
    view === "favorites"
      ? "Favorites"
      : view === "recent"
      ? "Recently Viewed"
      : "All Routes";

  function handleToggleFavorite(code: string) {
    setFavoriteCodes(toggleFavoriteCode(code));
  }

  // MODIFIED: pass route in location.state so PujDetailPage can render static view
  function handleOpenRoute(route: PujRoute) {
    addRecentRoute(route);
    setRecentRoutes((current) =>
      [route, ...current.filter((item) => item.code !== route.code)].slice(0, 6)
    );
    navigate(`/pujs/${route.code}`, {
      state: { route }, // <-- key change
    });
  }

  function handleSetView(newView: ViewFilter) {
    navigate(`/pujs?view=${newView}`);
  }

  return (
    <div className="pl-page">
      {/* ── Navbar ── */}
      <nav className="pl-nav">
        <div className="pl-nav__inner">
          <div className="pl-nav__brand" onClick={() => navigate("/home")}>
            <span className="pl-nav__logo">🚌</span>
            <span className="pl-nav__name">PUJ Route</span>
          </div>
          <div className="pl-nav__links">
            <button className="pl-nav__link" onClick={() => navigate("/home")}>
              Home
            </button>
            <button
              className="pl-nav__link pl-nav__link--active"
              onClick={() => navigate("/pujs")}
            >
              Routes
            </button>
            <button
              className="pl-nav__link"
              onClick={() => navigate("/profile")}
            >
              Profile
            </button>
            <button
              className="hp-nav__link"
              onClick={async () => {
                await logout();
                navigate("/login");
              }}
            >
              Logout
            </button>
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
              Find your jeepney route, save favorites, and revisit recently
              viewed trips.
            </p>
          </div>
          {!loading && !error && (
            <div className="pl-banner__stat">
              <span className="pl-banner__stat-num">
                {visibleRoutes.length}
              </span>
              <span className="pl-banner__stat-label">{activeLabel}</span>
            </div>
          )}
        </div>

        <div className="pl-banner__search-wrap">
          <div className="pl-search-wrap-col">
            {/* Text search */}
            <div className="pl-search">
              <svg className="pl-search__icon" viewBox="0 0 20 20" fill="none">
                <circle
                  cx="9"
                  cy="9"
                  r="6"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M13.5 13.5L17 17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <input
                type="text"
                className="pl-search__input"
                placeholder="Search route code, origin or destination..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {query && (
                <button
                  className="pl-search__clear"
                  onClick={() => setQuery("")}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Stopover dropdown */}
            <select
              className="pl-search pl-search--select"
              value={allStops.includes(query) ? query : ""}
              onChange={(e) => setQuery(e.target.value)}
            >
              <option value="">Filter by stopover location...</option>
              {allStops.map((stop) => (
                <option key={stop} value={stop}>
                  {stop}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="pl-tabs">
        <button
          type="button"
          className={`pl-tabs__item${
            view === "all" ? " pl-tabs__item--active" : ""
          }`}
          onClick={() => handleSetView("all")}
        >
          All Routes
        </button>
        <button
          type="button"
          className={`pl-tabs__item${
            view === "favorites" ? " pl-tabs__item--active" : ""
          }`}
          onClick={() => handleSetView("favorites")}
        >
          Favorites
        </button>
        <button
          type="button"
          className={`pl-tabs__item${
            view === "recent" ? " pl-tabs__item--active" : ""
          }`}
          onClick={() => handleSetView("recent")}
        >
          Recently Viewed
        </button>
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

        {!loading && !error && visibleRoutes.length === 0 && (
          <div className="pl-empty">
            <div className="pl-empty__icon">🔍</div>
            <p className="pl-empty__text">
              {view === "favorites"
                ? "No favorites yet. Tap the star icon on any route to save it here."
                : view === "recent"
                ? "You haven't viewed any routes yet. Open a route to see it here."
                : `No routes found for "${query}".`}
            </p>
            {view === "all" && (
              <button
                className="pl-empty__btn"
                onClick={() => setQuery("")}
              >
                Clear search
              </button>
            )}
          </div>
        )}

        {!loading && !error && visibleRoutes.length > 0 && (
          <div className="pl-grid">
            {visibleRoutes.map((puj) => {
              const isFavorite = favoriteCodes.includes(puj.code);
              return (
                <div
                  key={puj.code}
                  className="pl-card"
                  role="button"
                  tabIndex={0}
                  onClick={() => handleOpenRoute(puj)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      handleOpenRoute(puj);
                    }
                  }}
                >
                  <div className="pl-card__top">
                    <span className="pl-card__badge">{puj.code}</span>
                    <button
                      type="button"
                      className={`pl-card__favorite${
                        isFavorite ? " pl-card__favorite--active" : ""
                      }`}
                      onClick={(event) => {
                        event.stopPropagation();
                        handleToggleFavorite(puj.code);
                      }}
                      aria-label={
                        isFavorite
                          ? "Remove from favorites"
                          : "Add to favorites"
                      }
                    >
                      {isFavorite ? "★" : "☆"}
                    </button>
                  </div>
                  <div className="pl-card__body">
                    <p className="pl-card__origin">{puj.origin}</p>
                    <div className="pl-card__arrow-down">
                      <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
                        <path
                          d="M10 4v12M10 16l-4-4M10 16l4-4"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <p className="pl-card__destination">{puj.destination}</p>
                  </div>
                  {puj.otherRoutes && (
                    <div className="pl-card__footer">
                      <span className="pl-card__via">via {puj.otherRoutes}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}