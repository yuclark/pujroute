import { Link } from "react-router-dom";

interface Crumb {
  label: string;
  to?: string;
}

interface Props {
  crumbs: Crumb[];
}

export function PageHeader({ crumbs }: Props) {
  return (
    <div className="page-header">
      {crumbs.map((crumb, i) => (
        <span key={crumb.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {i > 0 && <span className="page-header__sep">/</span>}
          {crumb.to ? (
            <Link to={crumb.to} className="page-header__crumb" style={{ color: "inherit" }}>
              {crumb.label}
            </Link>
          ) : (
            <span className="page-header__current">{crumb.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}
