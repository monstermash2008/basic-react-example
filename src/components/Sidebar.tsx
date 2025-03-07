import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../hooks/ThemeContext";

const Sidebar = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="w-64 h-screen bg-[var(--sidebar)] p-4">
      <nav>
        <ul className="space-y-4">
          <li>
            <Link
              to="/"
              className={`block p-2 rounded ${
                location.pathname === "/"
                  ? "bg-blue-500 text-white"
                  : "text-[var(--text)] hover:bg-[var(--sidebar-hover)]"
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/pokemon"
              className={`block p-2 rounded ${
                location.pathname.includes("/pokemon")
                  ? "bg-blue-500 text-white"
                  : "text-[var(--text)] hover:bg-[var(--sidebar-hover)]"
              }`}
            >
              All Pokemon
            </Link>
          </li>
        </ul>
      </nav>
      <button
        onClick={toggleTheme}
        className="mt-4 w-full p-2 rounded bg-[var(--sidebar-hover)] text-[var(--text)] hover:opacity-80"
      >
        {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
    </div>
  );
};

export default Sidebar;
