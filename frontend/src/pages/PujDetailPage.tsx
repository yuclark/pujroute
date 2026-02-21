import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TopStepperNav } from "../components/TopStepperNav";
import { fetchPujDetail } from "../api/puj";
import type { PujRoute } from "../types/puj";

export function PujDetailPage() {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();

  const [puj, setPuj] = useState<PujRoute | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!code) return;
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPujDetail(code);
        if (!cancelled) setPuj(data);
      } catch {
        if (!cancelled) setError("Failed to load PUJ details.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [code]);

  return (
    <div className="puj-page">
      <TopStepperNav active="PUJ Details" />

      <main className="puj-page__content">
        <section className="puj-card puj-detail">
          <header className="puj-card__header puj-detail__header">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="puj-detail__back"
            >
              ← Back to list
            </button>

            <div className="puj-detail__heading">
              <span className="puj-detail__label">Jeepney Route Code</span>
              <h1 className="puj-detail__code">
                {puj?.code ?? code ?? "—"}
              </h1>
            </div>
          </header>

          <div className="puj-card__body">
            {loading && (
              <p className="puj-status puj-status--info">
                Loading route details…
              </p>
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
                    <p className="puj-detail__info-text">
                      {puj.destination}
                    </p>
                  </div>
                </section>

                {puj.otherRoutes && (
                  <section className="puj-detail__section">
                    <h3 className="puj-detail__section-title">
                      Other areas / Passing through
                    </h3>
                    <p className="puj-detail__section-text">
                      {puj.otherRoutes}
                    </p>
                  </section>
                )}

                <section className="puj-detail__section">
                  <h3 className="puj-detail__section-title">
                    Route overview
                  </h3>
                  <p className="puj-detail__section-text">
                    This screen can later include stop-by-stop instructions,
                    route maps, and fare breakdowns. For now it shows the basic
                    origin and destination for code <strong>{puj.code}</strong>.
                  </p>
                </section>

                <section className="puj-detail__actions">
                  <button
                    type="button"
                    className="puj-detail__primary-btn"
                    disabled
                  >
                    Route map (coming soon)
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
      </main>
    </div>
  );
}