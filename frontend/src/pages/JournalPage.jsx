import { useState } from "react"
import API from "../services/api"

function JournalPage() {

  const [text, setText] = useState("")
  const [result, setResult] = useState(null)

  const handleSubmit = async () => {

    try {

      const response = await API.post(
        "/journal",
        { text }
      )

      setResult(response.data.analysis)

    } catch (error) {

      alert("Failed to analyze journal")

    }

  }

  return (
    <div
      style={{
        padding: "40px",
        backgroundColor: "#EEF2FF",
        minHeight: "100vh"
      }}
    >

      <h1
        style={{
          color: "#4F46E5",
          marginBottom: "20px"
        }}
      >
        Write Your Thoughts
      </h1>

      <textarea
        rows="10"
        placeholder="How are you feeling today?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          width: "100%",
          padding: "20px",
          borderRadius: "10px",
          border: "1px solid #ccc",
          marginBottom: "20px",
          fontSize: "16px"
        }}
      />

      <button
        onClick={handleSubmit}
        style={{
          padding: "15px 30px",
          backgroundColor: "#4F46E5",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer"
        }}
      >
        Analyze Emotion
      </button>

      {
        result && (

          <div
            style={{
              marginTop: "30px",
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px"
            }}
          >

            <h2>Emotion Analysis Result</h2>

            <p>
              <strong>Emotion:</strong>
              {" "}
              {result.emotion}
            </p>

            <p>
              <strong>Confidence:</strong>
              {" "}
              {result.score}%
            </p>

          </div>

        )
      }

    </div>
  )
}

export default JournalPage