import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function HistoryPage() {

  const [journals, setJournals] = useState([]);

  useEffect(() => {
    fetchJournals();
  }, []);

  const fetchJournals = async () => {

    try {

      const response = await API.get("/journals");

      setJournals(response.data || []);

    } catch (error) {

      console.log(error);

    }

  };

  const emotionColors = {
    joy: "#22C55E",
    sadness: "#3B82F6",
    anger: "#EF4444",
    fear: "#F59E0B",
    love: "#EC4899",
    surprise: "#8B5CF6",
    neutral: "#64748B"
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          minHeight: "100vh",
          background: "#0f172a",
          padding: "40px",
          color: "white"
        }}
      >

        <h1
          style={{
            textAlign: "center",
            marginBottom: "40px",
            fontSize: "50px"
          }}
        >
          Journal History
        </h1>

        {journals.length === 0 ? (

          <h2
            style={{
              textAlign: "center"
            }}
          >
            No Journal Entries Yet
          </h2>

        ) : (

          journals
            .slice()
            .reverse()
            .map((journal, index) => (

              <div
                key={index}
                style={{
                  background: "rgba(30,41,59,0.85)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "20px",
                  padding: "25px",
                  marginBottom: "20px"
                }}
              >

                <p
                  style={{
                    marginBottom: "12px"
                  }}
                >
                  <strong>Journal:</strong>{" "}
                  {journal.text}
                </p>

                <p
                  style={{
                    marginBottom: "12px"
                  }}
                >
                  <strong>Emotion:</strong>

                  <span
                    style={{
                      marginLeft: "12px",
                      padding: "6px 14px",
                      borderRadius: "20px",
                      backgroundColor:
                        emotionColors[journal.emotion] || "#64748B",
                      color: "white"
                    }}
                  >
                    {journal.emotion}
                  </span>

                </p>

                <p>
                  <strong>Confidence:</strong>{" "}
                  {Number(journal.score).toFixed(2)}%
                </p>

                <button
                  onClick={async () => {

                    try {

                      await API.delete(
                        `/journal/${index}`
                      );

                      fetchJournals();

                    } catch (error) {

                      console.log(error);

                    }

                  }}
                  style={{
                    marginTop: "18px",
                    padding: "12px 20px",
                    background: "#EF4444",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer"
                  }}
                >
                  Delete Journal
                </button>

              </div>

            ))

        )}

      </div>
    </>
  );
}

export default HistoryPage;