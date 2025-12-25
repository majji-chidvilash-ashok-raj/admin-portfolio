import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { path: "/admin/dashboard", label: "Dashboard" },
    { path: "/admin/projects", label: "Projects" },
    { path: "/admin/skills", label: "Skills" },
    { path: "/admin/about", label: "About" },
    { path: "/admin/education", label: "Education" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <aside className="sidebar">
      <header className="sidebar-header">
        <h2>Admin Panel</h2>
      </header>

      <nav className="sidebar-nav">
        <ul className="sidebar-links">
          {navLinks.map(({ path, label }) => (
            <li
              key={path}
              className={pathname.startsWith(path) ? "active" : ""}
            >
              <Link to={path}>{label}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <footer className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </footer>
    </aside>
  );
}
