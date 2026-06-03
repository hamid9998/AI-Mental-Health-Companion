import Navbar from "../components/Navbar"

function AboutPage() {

return (

```
<>
  <Navbar />

  <div
    style={{
      maxWidth: "1000px",
      margin: "60px auto",
      padding: "20px",
      color: "white"
    }}
  >

    <h1
      style={{
        fontSize: "50px",
        marginBottom: "20px"
      }}
    >
      About AI Mental Health Companion
    </h1>

    <p
      style={{
        color: "#94a3b8",
        lineHeight: "1.8",
        fontSize: "18px"
      }}
    >
      AI Mental Health Companion is an intelligent web
      application designed to help users understand and
      monitor their emotional well-being using Artificial
      Intelligence.
    </p>

    <br />

    <p
      style={{
        color: "#94a3b8",
        lineHeight: "1.8",
        fontSize: "18px"
      }}
    >
      Users can write daily journals, analyze emotions
      using Natural Language Processing, visualize trends
      through interactive dashboards, and receive wellness
      recommendations based on emotional patterns.
    </p>

    <br />

    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit,minmax(250px,1fr))",
        gap: "25px",
        marginTop: "40px"
      }}
    >

      <div className="card">
        <h3>🧠 AI Emotion Detection</h3>
        <p>
          Detect emotions from journal entries using
          Hugging Face Transformers.
        </p>
      </div>

      <div className="card">
        <h3>📊 Analytics Dashboard</h3>
        <p>
          Visualize emotional trends and wellness
          patterns over time.
        </p>
      </div>

      <div className="card">
        <h3>☁️ Cloud Storage</h3>
        <p>
          Securely store journals using MongoDB Atlas.
        </p>
      </div>

    </div>

  </div>

</>
```

)
}

export default AboutPage
