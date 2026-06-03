import { useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function JournalPage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const analyzeEmotion = async () => {
    if (!text.trim()) {
      alert("Please write something in your journal.");
      return;
    }

    try {
      setLoading(true);

      const response = await API.post("/journal", {
        text: text,
      });

      setResult(response.data.analysis);

setAiResponse(
  response.data.ai_response
);

setAiResponse(
  response.data.ai_response
);

      setLoading(false);
    } catch (error) {
      console.error(error);
      alert("Error analyzing emotion");
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="journal-container">
        <h1>Write Your Journal</h1>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your thoughts here..."
        ></textarea>

        <button onClick={analyzeEmotion}>
          {loading ? "Analyzing..." : "Analyze Emotion"}
        </button>

        {result && (
          <div className="result-card">
            <h2>Emotion Analysis</h2>
            <p>
  <strong>Confidence:</strong>{" "}
{Number(result.score).toFixed(2)}%
</p>
<hr
  style={{
    margin: "20px 0",
    opacity: 0.2
  }}
/>



<h3>
  🤖 MindAI Assistant
</h3>

<p>
  {aiResponse}
</p>

            <p>
  <strong>Confidence:</strong>{" "}
  {Number(result.score).toFixed(2)}%
</p>
          </div>
        )}
      </div>
    </>
  );
}

export default JournalPage;