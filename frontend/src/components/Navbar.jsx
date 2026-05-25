import { Link } from "react-router-dom"
<Link to="/dashboard" style={{ color: "white" }}>
  Dashboard
</Link>
function Navbar() {
  return (
    <nav
      style={{
        padding: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#4F46E5",
        color: "white"
      }}
    >
      <h2>AI Mental Health Companion</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/" style={{ color: "white" }}>Home</Link>
        <Link to="/about" style={{ color: "white" }}>About</Link>
        <Link to="/login" style={{ color: "white" }}>Login</Link>
      </div>
    </nav>
  )
}

export default Navbar