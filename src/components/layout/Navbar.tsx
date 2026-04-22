import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { IconMenu, IconClose, IconPlus } from "../ui/Icons";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative text-sm font-medium transition-colors duration-150 pb-0.5 ${
      isActive
        ? "text-slate-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-emerald-500 after:rounded-full"
        : "text-slate-500 hover:text-slate-800"
    }`;

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shadow-sm group-hover:bg-emerald-600 transition-colors">
            <span className="text-white text-sm font-bold tracking-tight">
              S
            </span>
          </div>
          <span
            className="text-xl font-bold text-slate-800"
            style={{ fontFamily: "var(--font-display)" }}
          >
            SubTrack
          </span>
        </Link>

        <nav
          className="hidden sm:flex items-center gap-8"
          aria-label="Main navigation"
        >
          <NavLink to="/" end className={linkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/services" className={linkClass}>
            Services
          </NavLink>
          <Link
            to="/add"
            className="inline-flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-sm transition-colors duration-150"
          >
            <IconPlus className="w-4 h-4" />
            Add Service
          </Link>
        </nav>

        <button
          className="sm:hidden p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <IconClose className="w-5 h-5" />
          ) : (
            <IconMenu className="w-5 h-5" />
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="sm:hidden border-t border-slate-100 bg-white px-4 py-4 flex flex-col gap-1">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? "bg-emerald-50 text-emerald-700" : "text-slate-600 hover:bg-slate-50"}`
            }
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) =>
              `px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? "bg-emerald-50 text-emerald-700" : "text-slate-600 hover:bg-slate-50"}`
            }
            onClick={() => setMenuOpen(false)}
          >
            Services
          </NavLink>
          <div className="pt-2 mt-1 border-t border-slate-100">
            <Link
              to="/add"
              className="flex items-center justify-center gap-2 bg-emerald-500 text-white text-sm font-medium px-4 py-2.5 rounded-lg"
              onClick={() => setMenuOpen(false)}
            >
              <IconPlus className="w-4 h-4" />
              Add Service
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
