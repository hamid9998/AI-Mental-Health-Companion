import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function LandingPage() {
  return (
    <>
      <Navbar />

      <div className="hero">

        <div className="hero-content">

          <h1>
            Your Personal AI Mental Health Companion
          </h1>

          <p>
            Understand your emotions, track your mental wellness,
            and discover emotional patterns using advanced AI-powered
            sentiment analysis and analytics.
          </p>

          <div className="hero-buttons">

            <Link to="/journal">
              <button className="primary-btn">
                Start Journaling
              </button>
            </Link>

            <Link to="/dashboard">
              <button className="secondary-btn">
                View Dashboard
              </button>
            </Link>

          </div>

        </div>

        <div className="features">

          <div className="card">
            <h3>🧠 Emotion Detection</h3>

            <p>
              Analyze your feelings instantly using
              Hugging Face AI emotion models.
            </p>
          </div>

          <div className="card">
            <h3>📊 Analytics Dashboard</h3>

            <p>
              Visualize emotional trends and monitor
              your mental wellness journey.
            </p>
          </div>

          <div className="card">
            <h3>☁️ Secure Cloud Storage</h3>

            <p>
              Your journals are securely stored in
              MongoDB Atlas cloud database.
            </p>
          </div>

        </div>

        <div className="stats-section">

          <div className="stat-box">
            <h2>AI Powered</h2>
            <p>Emotion Recognition</p>
          </div>

          <div className="stat-box">
            <h2>24/7</h2>
            <p>Mental Wellness Tracking</p>
          </div>

          <div className="stat-box">
            <h2>Secure</h2>
            <p>Cloud Data Storage</p>
          </div>

        </div>

      </div>
    </>
  );
}

export default LandingPage;