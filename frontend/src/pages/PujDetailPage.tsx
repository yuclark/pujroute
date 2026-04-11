import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PageHeader } from "../shared/components/PageHeader";
import { fetchPujDetail } from "../shared/api/puj";
import type { PujRoute } from "../shared/types/puj";

export function PujDetailPage() {
  const { code }    = useParams<{ code: string }>();
  const navigate    = useNavigate();

  const [puj, setPuj]       = useState<PujRoute | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState<string | null>(null);

  useEffect(() => {
    if (!code) return;
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPujDetail(code!); // ✅ non-null assert — guarded above
        if (!cancelled) setPuj(data);
      } catch {
        if (!cancelled) setError("Failed to load PUJ details.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [code]);

  return (
    <div className="puj-page">
      <PageHeader
        crumbs={[
          { label: "Home", to: "/" },
          { label: "PUJ Routes", to: "/pujs" },
          { label: code ?? "…" },
        ]}
      />

      <div className="puj-page__content">
        <section className="puj-card">
          <header className="puj-card__header puj-detail__header">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="puj-detail__back"
            >
              ← Back to list
            </button>

            <div>
              <span className="puj-detail__label">Jeepney Route Code</span>
              <h1 className="puj-detail__code">{puj?.code ?? code ?? "—"}</h1>
            </div>
          </header>

          <div className="puj-card__body">
            {loading && (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div className="skeleton" style={{ height: 70, borderRadius: 10 }} />
                <div className="skeleton" style={{ height: 70, borderRadius: 10 }} />
                <div className="skeleton" style={{ height: 100, borderRadius: 10 }} />
              </div>
            )}

            {error && (
              <p className="puj-status puj-status--error">{error}</p>
            )}

            {!loading && !error && puj && (
              <div className="puj-detail__content">
                <section className="puj-detail__summary">
                  <div className="puj-detail__info-block">
                    <p className="puj-detail__info-label">Origin</p>
                    <p className="puj-detail__info-text">{puj.origin}</p>
                  </div>
                  <div className="puj-detail__info-block">
                    <p className="puj-detail__info-label">Destination</p>
                    <p className="puj-detail__info-text">{puj.destination}</p>
                  </div>
                </section>

                {puj.otherRoutes && (
                  <section className="puj-detail__section">
                    <h3 className="puj-detail__section-title">
                      Passing through / Other areas
                    </h3>
                    <p className="puj-detail__section-text">{puj.otherRoutes}</p>
                  </section>
                )}

                <section className="puj-detail__section">
                  <h3 className="puj-detail__section-title">Route overview</h3>
                  <p className="puj-detail__section-text">
                    Stop-by-stop instructions, route maps, and fare breakdowns
                    will be available here soon. Currently showing the basic
                    origin and destination for route{" "}
                    <strong>{puj.code}</strong>.
                  </p>
                </section>

                <section className="puj-detail__actions">
                  <button
                    type="button"
                    className="puj-detail__primary-btn"
                    disabled
                  >
                    🗺 Route map (coming soon)
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate("/pujs")}
                    className="puj-detail__ghost-btn"
                  >
                    Back to all routes
                  </button>
                </section>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
