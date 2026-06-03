import { Link } from "react-router-dom";

function Footer() {

  return (

    <footer className="footer">

      <div className="footer-content">

        <div className="footer-brand">

          <h2>🧠 MindAI</h2>

          <p>
            AI-powered mental wellness platform helping
            users understand emotions and improve
            mental health through intelligent journaling.
          </p>

        </div>

        <div className="footer-links">

          <h3>Quick Links</h3>

          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/journal">Journal</Link>
          <Link to="/history">History</Link>

        </div>

        <div className="footer-contact">

          <h3>Platform</h3>

          <p>AI Emotion Analysis</p>
          <p>Mental Wellness Tracking</p>
          <p>Secure Data Storage</p>

        </div>

      </div>

      <div className="footer-bottom">

        <p>
          © 2026 MindAI • All Rights Reserved
        </p>

      </div>

    </footer>

  );
}

export default Footer;