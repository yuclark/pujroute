import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { PageHeader } from "../shared/components/PageHeader";
import { fetchPujDetail } from "../shared/api/puj";
import { addRecentRoute } from "../shared/lib/routeStorage";
import type { PujRoute } from "../shared/types/puj";
import { useAuth } from "../shared/context/AuthContext";
import "./PujDetailPage.css";

export function PujDetailPage() {
  const { code }    = useParams<{ code: string }>();
  const navigate    = useNavigate();
  const { logout } = useAuth();
  const location    = useLocation();
  const { from, to } = (location.state as { from?: string; to?: string }) ?? {};

  const [puj, setPuj]         = useState<PujRoute | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    if (!code) return;
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPujDetail(code!);
        if (!cancelled) {
          setPuj(data);
          addRecentRoute(data);
        }
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
      <nav className="detail-nav">
        <div className="detail-nav__inner">
          <div className="detail-nav__brand" onClick={() => navigate("/home")}>
            <div className="detail-nav__logo">🚌</div>
            <span className="detail-nav__name">PUJ Route</span>
          </div>
          <div className="detail-nav__links">
            <button className="detail-nav__link" type="button" onClick={() => navigate("/home")}>Home</button>
            <button className="detail-nav__link" type="button" onClick={() => navigate("/pujs")}>Routes</button>
            <button className="detail-nav__link" type="button" onClick={() => navigate("/profile")}>Profile</button>
            <button className="hp-nav__link" onClick={async () => { await logout(); navigate("/login"); }}>Logout</button>
          </div>
        </div>
      </nav>

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

                {/* ── Summary ── */}
                <section className="puj-detail__summary">
                  <div className="puj-detail__info-block">
                    <p className="puj-detail__info-label">Origin</p>
                    <p className="puj-detail__info-text">{puj.origin}</p>
                  </div>
                  <div className="puj-detail__info-block">
                    <p className="puj-detail__info-label">Destination</p>
                    <p className="puj-detail__info-text">{puj.destination}</p>
                  </div>
                  {puj.baseFare && (
                    <div className="puj-detail__info-block">
                      <p className="puj-detail__info-label">Base Fare</p>
                      <p className="puj-detail__info-text">₱{puj.baseFare.toFixed(0)}</p>
                    </div>
                  )}
                </section>

                {/* ── Route Overview ── */}
                {puj.routeOverview && (
                  <section className="puj-detail__section">
                    <h3 className="puj-detail__section-title">Route Overview</h3>
                    <p className="puj-detail__section-text">{puj.routeOverview}</p>
                  </section>
                )}

                {/* ── Stop Sequence ── */}
                {puj.stops && puj.stops.length > 0 && (
                  <section className="puj-detail__section">
                    <h3 className="puj-detail__section-title">Complete Stop Sequence</h3>

                    {/* Show legend only if user searched with from/to */}
                    {(from || to) && (
                      <div className="puj-detail__legend">
                        {from && <span className="puj-detail__legend-item puj-detail__legend-item--from">📍 Your Start</span>}
                        {to && <span className="puj-detail__legend-item puj-detail__legend-item--to">🏁 Your Stop</span>}
                      </div>
                    )}

                    <ol className="puj-detail__stops-list">
                      {puj.stops.map((stop, index) => {
                        const isFrom = !!from && stop === from;
                        const isTo = !!to && stop === to;
                        return (
                          <li
                            key={index}
                            className={`puj-detail__stop-item${isFrom ? " puj-detail__stop-item--from" : ""}${isTo ? " puj-detail__stop-item--to" : ""}`}
                          >
                            {isFrom && (
                              <span className="puj-detail__stop-badge puj-detail__stop-badge--from">
                                📍 Your Start
                              </span>
                            )}
                            {isTo && (
                              <span className="puj-detail__stop-badge puj-detail__stop-badge--to">
                                🏁 Your Stop
                              </span>
                            )}
                            {stop}
                          </li>
                        );
                      })}
                    </ol>
                  </section>
                )}

                {/* ── Fare Info ── */}
                {puj.baseFare && (
                  <section className="puj-detail__section">
                    <h3 className="puj-detail__section-title">Fare Information</h3>
                    <div className="puj-detail__fare-info">
                      <p><strong>Base Fare:</strong> ₱{puj.baseFare.toFixed(0)}</p>
                      <p className="puj-detail__fare-note">
                        Minimum fare ₱13 covers the first 4km. Additional ₱1.80 per km after 4km (Traditional Jeepney rate, LTFRB effective Oct 8, 2023).
                      </p>
                    </div>
                  </section>
                )}

              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}