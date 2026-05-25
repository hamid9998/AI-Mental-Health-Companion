import Navbar from "../components/Navbar"

function LandingPage() {
  return (
    <div>

      <Navbar />

      <div
        style={{
          height: "90vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#EEF2FF",
          textAlign: "center",
          padding: "20px"
        }}
      >
        <h1
          style={{
            fontSize: "60px",
            color: "#4F46E5",
            marginBottom: "20px"
          }}
        >
          AI Mental Health Companion
        </h1>

        <p
          style={{
            fontSize: "22px",
            maxWidth: "700px",
            color: "#444",
            marginBottom: "30px"
          }}
        >
          Your private, judgment-free emotional support system.
          Track your emotions, analyze mood patterns,
          and receive AI-powered wellness suggestions.
        </p>

        <button
          style={{
            padding: "15px 30px",
            fontSize: "18px",
            backgroundColor: "#4F46E5",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer"
          }}
        >
          Get Started
        </button>

      </div>

    </div>
  )
}

export default LandingPage