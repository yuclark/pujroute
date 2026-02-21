import { NavLink } from "react-router-dom";

const base =
  "flex flex-col items-center justify-center gap-0.5 flex-1 py-2 text-xs";

export function BottomNav() {
  return (
    <nav className="w-full border-t bg-white fixed bottom-0 left-0">
      <div className="max-w-md mx-auto flex">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${base} ${isActive ? "text-blue-600" : "text-slate-500"}`
          }
        >
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/pujs"
          className={({ isActive }) =>
            `${base} ${isActive ? "text-blue-600" : "text-slate-500"}`
          }
        >
          <span>PUJs</span>
        </NavLink>

        <button className={`${base} text-slate-400`} type="button">
          <span>Favorites</span>
        </button>

        <button className={`${base} text-slate-400`} type="button">
          <span>Settings</span>
        </button>
      </div>
    </nav>
  );
}