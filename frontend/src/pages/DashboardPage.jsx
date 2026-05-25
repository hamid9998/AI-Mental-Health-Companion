import { useEffect, useState } from "react"

import API from "../services/api"

import "../styles/dashboard.css"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js"

import { Line } from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

function DashboardPage() {

  const [journals, setJournals] = useState([])
  const [loading, setLoading] = useState(true)  
  useEffect(() => {

    fetchJournals()

  }, [])

  const fetchJournals = async () => {

    try {

      const response = await API.get("/journals")

      setJournals(response.data)
      setLoading(false)

    } catch (error) {

      console.log(error)

    }

  }

  // Mood score mapping
  const moodMap = {
    joy: 5,
    sadness: -3,
    anger: -4,
    fear: -2,
    love: 4,
    surprise: 2,
    neutral: 0
  }

  const chartData = {
    labels: journals.map((_, index) => `Entry ${index + 1}`),

    datasets: [
      {
        label: "Mood Score",

        data: journals.map(
          (journal) =>
            moodMap[journal.emotion] || 0
        ),

        borderColor: "#4F46E5",

        backgroundColor: "#4F46E5"
      }
    ]
  }

  // Total journals
  const totalJournals = journals.length

  // Most common emotion
  const emotionCount = {}

  journals.forEach((journal) => {

    emotionCount[journal.emotion] =
      (emotionCount[journal.emotion] || 0) + 1

  })

  const mostCommonEmotion =
    Object.keys(emotionCount).reduce(
      (a, b) =>
        emotionCount[a] > emotionCount[b]
          ? a
          : b,
      "None"
    )

    if (loading) {
  return <h1>Loading Dashboard...</h1>
}

  return (
    <div className="dashboard-container">

      <h1 className="dashboard-title">
        Mental Health Dashboard
      </h1>

      <div className="stats-container">

        <div className="stat-card">
          <h2>Total Journals</h2>
          <p>{totalJournals}</p>
        </div>

        <div className="stat-card">
          <h2>Most Common Emotion</h2>
          <p>{mostCommonEmotion}</p>
        </div>

        <div className="stat-card">
          <h2>Latest Mood</h2>

          <p>
            {
              journals.length > 0
                ? journals[journals.length - 1].emotion
                : "N/A"
            }
          </p>

        </div>

      </div>

      <div className="chart-container">

        <h2 style={{ marginBottom: "20px" }}>
          Mood Trends
        </h2>

        <Line data={chartData} />

      </div>


      <div className="chart-container">

  <h2 style={{ marginBottom: "20px" }}>
    Recent Journals
  </h2>

  {
    journals.slice(-5).reverse().map(
      (journal, index) => (

        <div
          key={index}
          style={{
            padding: "15px",
            borderBottom: "1px solid #ddd"
          }}
        >

          <p>
            <strong>Text:</strong>
            {" "}
            {journal.text}
          </p>

          <p>
            <strong>Emotion:</strong>
            {" "}
            {journal.emotion}
          </p>

        </div>

      )
    )
  }

</div>

      <div className="suggestion-box">

        <h2>AI Wellness Suggestion</h2>

        <p>

          {
            mostCommonEmotion === "sadness"
              ? "Consider taking breaks and talking to supportive people."

              : mostCommonEmotion === "fear"
              ? "Practice breathing exercises and relaxation."

              : mostCommonEmotion === "joy"
              ? "Great emotional progress! Keep your healthy routine."

              : "Maintain emotional balance with healthy habits."
          }

        </p>

      </div>

    </div>
  )
}

export default DashboardPage