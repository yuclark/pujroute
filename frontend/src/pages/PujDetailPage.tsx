import { useMemo } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { PageHeader } from "../shared/components/PageHeader";
import type { PujRoute } from "../shared/types/puj";
import { useAuth } from "../shared/context/AuthContext";
import "./PujDetailPage.css";

type TripLeg = {
  routeCode: string;
  route: PujRoute;
  direction: string;
  fromStop: string;
  toStop: string;
};

type TripState = {
  from?: string;
  to?: string;
  legs?: TripLeg[]; // 1 to 3 legs max (backend-enforced)
  route?: PujRoute; // when coming from /pujs list
};

export function PujDetailPage() {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const location = useLocation();

  const { from, to, legs, route } = (location.state as TripState) ?? {};

  const isMultiLegTrip = !!legs && legs.length > 0;
  const totalLegs = legs?.length ?? 0;

  const routesByCode = useMemo(() => {
    const map: Record<string, PujRoute> = {};
    (legs ?? []).forEach((leg) => {
      map[leg.routeCode] = leg.route;
    });
    return map;
  }, [legs]);

  const headerLabel = isMultiLegTrip ? `${totalLegs}-Leg Trip` : "Jeepney Route Code";
  const headerCodeLine = isMultiLegTrip
    ? legs!.map((l) => l.routeCode).join(" → ")
    : code ?? "—";

  function getStopsForLeg(route: PujRoute, fromStop: string, toStop: string): string[] {
    const stops = route.stops ?? [];
    if (!fromStop || !toStop || stops.length === 0) return stops;

    const fromIndex = stops.findIndex((s) => s === fromStop);
    const toIndex = stops.findIndex((s) => s === toStop);

    if (fromIndex === -1 || toIndex === -1) {
      return stops;
    }

    if (fromIndex <= toIndex) {
      return stops.slice(fromIndex, toIndex + 1);
    } else {
      const reversed = [...stops].reverse();
      const rFrom = reversed.findIndex((s) => s === fromStop);
      const rTo = reversed.findIndex((s) => s === toStop);
      if (rFrom === -1 || rTo === -1) return reversed;
      if (rFrom <= rTo) {
        return reversed.slice(rFrom, rTo + 1);
      }
      return reversed;
    }
  }

  // Special 2‑leg view (embedded style)
  function renderTwoLegView(first: TripLeg, second: TripLeg) {
    const firstStops = getStopsForLeg(first.route, first.fromStop, first.toStop);
    const secondStops = getStopsForLeg(second.route, second.fromStop, second.toStop);
    const transferStop = first.toStop; // also second.fromStop

    return (
      <>
        {(from || to) && (
          <section className="puj-detail__section">
            <h3 className="puj-detail__section-title">Trip Summary</h3>
            <div className="puj-detail__fare-info">
              {from && (
                <p>
                  <strong>Start:</strong> {from}
                </p>
              )}
              <p>
                <strong>Transfer Stop:</strong> {transferStop} (change to route{" "}
                {second.routeCode})
              </p>
              {to && (
                <p>
                  <strong>Final Destination:</strong> {to}
                </p>
              )}
            </div>
          </section>
        )}

        {/* First leg */}
        <section className="puj-detail__section">
          <h3 className="puj-detail__section-title">
            First Leg – Route {first.routeCode}
          </h3>
          <p className="puj-detail__section-text">
            From {first.fromStop} to {first.toStop} via route {first.routeCode}.
          </p>

          <div className="puj-detail__legend">
            <span className="puj-detail__legend-item puj-detail__legend-item--from">
              📍 Your Start
            </span>
            <span className="puj-detail__legend-item puj-detail__legend-item--to">
              🔁 Transfer Stop
            </span>
          </div>

          <ol className="puj-detail__stops-list">
            {firstStops.map((stop, idx) => {
              const isStart = stop === first.fromStop;
              const isTransfer = stop === transferStop;
              return (
                <li
                  key={idx}
                  className={`puj-detail__stop-item${
                    isStart ? " puj-detail__stop-item--from" : ""
                  }${isTransfer ? " puj-detail__stop-item--to" : ""}`}
                >
                  {isStart && (
                    <span className="puj-detail__stop-badge puj-detail__stop-badge--from">
                      📍 Your Start
                    </span>
                  )}
                  {isTransfer && (
                    <span className="puj-detail__stop-badge puj-detail__stop-badge--to">
                      🔁 Transfer Here
                    </span>
                  )}
                  {stop}
                </li>
              );
            })}
          </ol>
        </section>

        {/* Second leg */}
        <section className="puj-detail__section">
          <h3 className="puj-detail__section-title">
            Second Leg – Route {second.routeCode}
          </h3>
          <p className="puj-detail__section-text">
            From {second.fromStop} to {second.toStop} via route {second.routeCode}.
          </p>

          <div className="puj-detail__legend">
            <span className="puj-detail__legend-item puj-detail__legend-item--from">
              🔁 Transfer Stop
            </span>
            <span className="puj-detail__legend-item puj-detail__legend-item--to">
              🏁 Final Destination
            </span>
          </div>

          <ol className="puj-detail__stops-list">
            {secondStops.map((stop, idx) => {
              const isTransfer = stop === transferStop;
              const isFinal = stop === second.toStop;
              return (
                <li
                  key={idx}
                  className={`puj-detail__stop-item${
                    isTransfer ? " puj-detail__stop-item--from" : ""
                  }${isFinal ? " puj-detail__stop-item--to" : ""}`}
                >
                  {isTransfer && (
                    <span className="puj-detail__stop-badge puj-detail__stop-badge--from">
                      🔁 Transfer Here
                    </span>
                  )}
                  {isFinal && (
                    <span className="puj-detail__stop-badge puj-detail__stop-badge--to">
                      🏁 Final Destination
                    </span>
                  )}
                  {stop}
                </li>
              );
            })}
          </ol>
        </section>
      </>
    );
  }

  // Generic view for 1 or 3+ legs
  function renderGenericMultiLegView() {
    return (
      <>
        {(from || to) && (
          <section className="puj-detail__section">
            <h3 className="puj-detail__section-title">Trip Summary</h3>
            <div className="puj-detail__fare-info">
              {from && (
                <p>
                  <strong>Start:</strong> {from}
                </p>
              )}
              {to && (
                <p>
                  <strong>Final Destination:</strong> {to}
                </p>
              )}
              {totalLegs > 1 && (
                <p>
                  <strong>Transfers:</strong> {totalLegs - 1}
                </p>
              )}
            </div>
          </section>
        )}

        {legs!.map((leg, index) => {
          const route = leg.route;
          const legStops = getStopsForLeg(route, leg.fromStop, leg.toStop);
          const isFirstLeg = index === 0;
          const isLastLeg = index === legs!.length - 1;

          return (
            <section key={index} className="puj-detail__section">
              <h3 className="puj-detail__section-title">
                Leg {index + 1} – Route {route.code}
              </h3>
              <p className="puj-detail__section-text">
                From {leg.fromStop} to {leg.toStop} via route {route.code}.
              </p>

              <div className="puj-detail__legend">
                {isFirstLeg && (
                  <span className="puj-detail__legend-item puj-detail__legend-item--from">
                    📍 Your Start
                  </span>
                )}
                {!isFirstLeg && (
                  <span className="puj-detail__legend-item puj-detail__legend-item--from">
                    🔁 Transfer Here
                  </span>
                )}
                {isLastLeg && (
                  <span className="puj-detail__legend-item puj-detail__legend-item--to">
                    🏁 Final Destination
                  </span>
                )}
              </div>

              <ol className="puj-detail__stops-list">
                {legStops.map((stop, sIdx) => {
                  const isStartStop = stop === leg.fromStop;
                  const isEndStop = stop === leg.toStop;

                  const isGlobalStart = isFirstLeg && isStartStop;
                  const isGlobalEnd = isLastLeg && isEndStop;

                  return (
                    <li
                      key={sIdx}
                      className={`puj-detail__stop-item${
                        isStartStop ? " puj-detail__stop-item--from" : ""
                      }${isEndStop ? " puj-detail__stop-item--to" : ""}`}
                    >
                      {isGlobalStart && (
                        <span className="puj-detail__stop-badge puj-detail__stop-badge--from">
                          📍 Your Start
                        </span>
                      )}
                      {!isGlobalStart && isStartStop && (
                        <span className="puj-detail__stop-badge puj-detail__stop-badge--from">
                          🔁 Transfer Here
                        </span>
                      )}
                      {isGlobalEnd && (
                        <span className="puj-detail__stop-badge puj-detail__stop-badge--to">
                          🏁 Final Destination
                        </span>
                      )}
                      {stop}
                    </li>
                  );
                })}
              </ol>

              <section className="puj-detail__summary">
                <div className="puj-detail__info-block">
                  <p className="puj-detail__info-label">Origin</p>
                  <p className="puj-detail__info-text">{route.origin}</p>
                </div>
                <div className="puj-detail__info-block">
                  <p className="puj-detail__info-label">Destination</p>
                  <p className="puj-detail__info-text">{route.destination}</p>
                </div>
                {route.baseFare && (
                  <div className="puj-detail__info-block">
                    <p className="puj-detail__info-label">Base Fare</p>
                    <p className="puj-detail__info-text">
                      ₱{route.baseFare.toFixed(0)}
                    </p>
                  </div>
                )}
              </section>
            </section>
          );
        })}
      </>
    );
  }

  return (
    <div className="puj-page">
      <nav className="detail-nav">
        <div className="detail-nav__inner">
          <div className="detail-nav__brand" onClick={() => navigate("/home")}>
            <div className="detail-nav__logo">🚌</div>
            <span className="detail-nav__name">PUJ Route</span>
          </div>
          <div className="detail-nav__links">
            <button
              className="detail-nav__link"
              type="button"
              onClick={() => navigate("/home")}
            >
              Home
            </button>
            <button
              className="detail-nav__link"
              type="button"
              onClick={() => navigate("/pujs")}
            >
              Routes
            </button>
            <button
              className="detail-nav__link"
              type="button"
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
              <span className="puj-detail__label">{headerLabel}</span>
              <h1 className="puj-detail__code">{headerCodeLine}</h1>
              {isMultiLegTrip && (
                <p className="puj-detail__sub">
                  {totalLegs === 1
                    ? `Direct trip on route ${legs![0].routeCode}`
                    : `Trip with ${totalLegs - 1} transfer${
                        totalLegs - 1 > 1 ? "s" : ""
                      } across routes ${headerCodeLine}`}
                </p>
              )}
            </div>
          </header>

          <div className="puj-card__body">
            {/* Static route view if no legs but route is provided (from /pujs list) */}
            {!isMultiLegTrip && route && (
              <div className="puj-detail__content">
                <section className="puj-detail__section">
                  <h3 className="puj-detail__section-title">Route Overview</h3>
                  <p className="puj-detail__section-text">
                    Jeepney route {route.code} from {route.origin} to{" "}
                    {route.destination}
                    {route.via ? ` via ${route.via}` : ""}.
                  </p>

                  <section className="puj-detail__summary">
                    <div className="puj-detail__info-block">
                      <p className="puj-detail__info-label">Origin</p>
                      <p className="puj-detail__info-text">{route.origin}</p>
                    </div>
                    <div className="puj-detail__info-block">
                      <p className="puj-detail__info-label">Destination</p>
                      <p className="puj-detail__info-text">{route.destination}</p>
                    </div>
                    {route.baseFare && (
                      <div className="puj-detail__info-block">
                        <p className="puj-detail__info-label">Base Fare</p>
                        <p className="puj-detail__info-text">
                          ₱{route.baseFare.toFixed(0)}
                        </p>
                      </div>
                    )}
                  </section>

                  {route.stops && route.stops.length > 0 && (
                    <section className="puj-detail__section">
                      <h3 className="puj-detail__section-title">All Stops</h3>
                      <ol className="puj-detail__stops-list">
                        {route.stops.map((stop, idx) => (
                          <li key={idx} className="puj-detail__stop-item">
                            {stop}
                          </li>
                        ))}
                      </ol>
                    </section>
                  )}
                </section>
              </div>
            )}

            {/* Existing multi‑leg trip view */}
            {isMultiLegTrip && (
              <div className="puj-detail__content">
                {totalLegs === 2
                  ? renderTwoLegView(legs![0], legs![1])
                  : renderGenericMultiLegView()}

                {legs![0].route.baseFare && (
                  <section className="puj-detail__section">
                    <h3 className="puj-detail__section-title">
                      Fare Information
                    </h3>
                    <div className="puj-detail__fare-info">
                      <p>
                        <strong>Base Fare (per leg):</strong>{" "}
                        ₱{legs![0].route.baseFare.toFixed(0)}
                      </p>
                      <p className="puj-detail__fare-note">
                        Minimum fare ₱13 covers the first 4km. Additional ₱1.80
                        per km after 4km (Traditional Jeepney rate, LTFRB
                        effective Oct 8, 2023).
                      </p>
                    </div>
                  </section>
                )}
              </div>
            )}

            {/* Fallback if neither legs nor route */}
            {!isMultiLegTrip && !route && (
              <p className="puj-status">
                No trip data available. Try searching for a route from the Home
                page.
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}