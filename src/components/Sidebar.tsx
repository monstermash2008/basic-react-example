import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 h-screen bg-gray-200 p-4">
      <nav>
        <ul className="space-y-4">
          <li>
            <Link
              to="/"
              className={`block p-2 rounded ${
                location.pathname === "/"
                  ? "bg-blue-500 text-white"
                  : "text-gray-700"
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
                  : "text-gray-700"
              }`}
            >
              All Pokemon
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
