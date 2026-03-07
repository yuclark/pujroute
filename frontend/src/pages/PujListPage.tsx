import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { fetchPujs } from "../api/puj";
import type { PujRoute } from "../types/puj";

function SkeletonGrid() {
  return (
    <div className="puj-skeleton-grid">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="skeleton puj-skeleton-item" />
      ))}
    </div>
  );
}

export function PujListPage() {
  const [query, setQuery]   = useState("");
  const [pujs, setPujs]     = useState<PujRoute[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState<string | null>(null);
  const navigate            = useNavigate();

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPujs(query.trim() || undefined);
        if (!cancelled) setPujs(data);
      } catch {
        if (!cancelled) setError("Failed to load PUJ list.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [query]);

  return (
    <div className="puj-page">
      <PageHeader crumbs={[{ label: "Home", to: "/" }, { label: "PUJ Routes" }]} />

      <div className="puj-page__content">
        <section className="puj-card">
          <header className="puj-card__header">
            <div>
              <h2 className="puj-card__title">PUJ Routes</h2>
              <p className="puj-card__subtitle">
                Browse jeepney routes and tap a code to view full details.
              </p>
            </div>
          </header>

          <div className="puj-card__body">
            <div className="puj-search">
              <input
                type="text"
                className="puj-search__input"
                placeholder="Search by code, origin or destination…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            {loading && <SkeletonGrid />}

            {error && (
              <p className="puj-status puj-status--error">{error}</p>
            )}

            {!loading && !error && pujs.length === 0 && (
              <p className="puj-status puj-status--info">
                No routes match your search.
              </p>
            )}

            {!loading && !error && pujs.length > 0 && (
              <div className="puj-grid">
                {pujs.map((puj) => (
                  <button
                    key={puj.code}
                    onClick={() => navigate(`/pujs/${puj.code}`)}
                    className="puj-item"
                  >
                    <span className="puj-item__code">{puj.code}</span>
                    <span className="puj-item__route">
                      {puj.origin} → {puj.destination}
                    </span>
                    {puj.otherRoutes && (
                      <span className="puj-item__meta">{puj.otherRoutes}</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
