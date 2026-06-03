import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {

  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {

    localStorage.removeItem("token");

    alert("Logged out successfully");

    navigate("/login");
  };

  return (

    <nav className="navbar">

      <div className="logo">

        <div className="logo-circle">
          🧠
        </div>

        <div>
          <h2>MindAI</h2>

          <span className="logo-subtitle">
            Mental Wellness Platform
          </span>
        </div>

      </div>

      <div className="nav-links">

        <Link
          className={
            location.pathname === "/"
              ? "active-link"
              : ""
          }
          to="/"
        >
          Home
        </Link>

        {
          token && (
            <>
              <Link
                className={
                  location.pathname === "/dashboard"
                    ? "active-link"
                    : ""
                }
                to="/dashboard"
              >
                Dashboard
              </Link>

              <Link
                className={
                  location.pathname === "/journal"
                    ? "active-link"
                    : ""
                }
                to="/journal"
              >
                Journal
              </Link>

              <Link
                className={
                  location.pathname === "/history"
                    ? "active-link"
                    : ""
                }
                to="/history"
              >
                History
              </Link>
            </>
          )
        }

        {
          !token ? (

            <Link
              className={
                location.pathname === "/login"
                  ? "active-link"
                  : ""
              }
              to="/login"
            >
              Login
            </Link>

          ) : (

            <button
              onClick={handleLogout}
              className="logout-btn"
            >
              Logout
            </button>

          )
        }

      </div>

    </nav>

  );
}

export default Navbar;