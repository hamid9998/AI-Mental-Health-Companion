import { useEffect, useState } from "react"
import API from "../services/api"
import "../styles/dashboard.css"
import Navbar from "../components/Navbar"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from "chart.js"

import { Line, Pie } from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
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

      setJournals(
        Array.isArray(response.data)
          ? response.data
          : []
      )

    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)

    }

  }

  const moodMap = {
    joy: 5,
    love: 4,
    surprise: 2,
    neutral: 0,
    fear: -2,
    sadness: -3,
    anger: -4
  }

  if (loading) {

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <h1>Loading Analytics...</h1>
      </div>
    </>
  )

}

  if (journals.length === 0) {

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <h1>No Journal Data Yet</h1>
        <p>Start writing journals to see analytics.</p>
      </div>
    </>
  )

}

  const emotionCount = {}

  journals.forEach((journal) => {

    emotionCount[journal.emotion] =
      (emotionCount[journal.emotion] || 0) + 1

  })

  const totalJournals = journals.length

  const mostCommonEmotion =
    Object.keys(emotionCount).length > 0
      ? Object.keys(emotionCount).reduce(
          (a, b) =>
            emotionCount[a] > emotionCount[b]
              ? a
              : b
        )
      : "neutral"

  const moodScores = journals.map(
    (journal) =>
      moodMap[journal.emotion] || 0
  )

  const averageMood =
    moodScores.length > 0
      ? (
          moodScores.reduce(
            (a, b) => a + b,
            0
          ) / moodScores.length
        ).toFixed(1)
      : 0

  const trend =
    averageMood > 1
      ? "Improving"
      : averageMood < -1
      ? "Declining"
      : "Stable"

  const moodStatus =
    averageMood >= 3
      ? "Excellent"
      : averageMood >= 1
      ? "Good"
      : averageMood >= 0
      ? "Neutral"
      : "Needs Attention"

  const recommendations = {

    sadness: [
      "Talk with supportive friends.",
      "Take a short walk outdoors.",
      "Write positive thoughts."
    ],

    fear: [
      "Practice deep breathing.",
      "Reduce stress triggers.",
      "Try mindfulness exercises."
    ],

    anger: [
      "Take a short break.",
      "Avoid heated discussions.",
      "Try relaxation exercises."
    ],

    joy: [
      "Keep your healthy routine.",
      "Celebrate small wins.",
      "Continue journaling."
    ]

  }

  const activeSuggestions =
    recommendations[mostCommonEmotion] || [
      "Maintain healthy habits.",
      "Stay hydrated.",
      "Get enough sleep."
    ]

  const lineChartData = {

    labels: journals.map(
      (_, index) => `Entry ${index + 1}`
    ),

    datasets: [
      {
        label: "Mood Score",

        data: journals.map(
          (journal) =>
            moodMap[journal.emotion] || 0
        ),

        borderColor: "#8B5CF6",

        backgroundColor: "#8B5CF6",

        tension: 0.4
      }
    ]

  }

  const pieChartData = {

    labels: Object.keys(emotionCount),

    datasets: [
      {
        data: Object.values(emotionCount),

        backgroundColor: [
          "#22C55E",
          "#3B82F6",
          "#EF4444",
          "#F59E0B",
          "#8B5CF6",
          "#6B7280"
        ]
      }
    ]

  }

  return (
    <>
      <Navbar />

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
          <h2>Average Mood</h2>
          <p>{averageMood}</p>
        </div>

        <div className="stat-card">
          <h2>Mental Wellness</h2>
          <p>{moodStatus}</p>
        </div>

        <div className="stat-card">
          <h2>Trend</h2>
          <p>{trend}</p>
        </div>

      </div>

      <div className="chart-container">

        <h2>Mood Trend Analysis</h2>

        <Line data={lineChartData} />

      </div>

      <div className="chart-container">

  <h2>Emotion Distribution</h2>

  <div className="pie-chart-wrapper">

    <Pie
      data={pieChartData}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: "#ffffff"
            }
          }
        }
      }}
    />

  </div>

</div>

      <div className="chart-container">

        <h2>AI Insights</h2>

        <p>• Most Common Emotion: {mostCommonEmotion}</p>

        <p>• Average Mood Score: {averageMood}</p>

        <p>• Emotional Trend: {trend}</p>

        <p>• Total Journal Entries: {totalJournals}</p>

      </div>

      <div className="chart-container">

        <h2>Recent Journals</h2>

        {
          journals
            .slice(-5)
            .reverse()
            .map((journal, index) => (

              <div
                key={index}
                className="recent-journal"
              >

                <p>
                  <strong>Journal:</strong> {journal.text}
                </p>

                <p>
                  <strong>Emotion:</strong> {journal.emotion}
                </p>

                <p>
                  <strong>Confidence:</strong> {journal.score}%
                </p>

              </div>

            ))
        }

      </div>

      <div className="suggestion-box">

        <h2>
          AI Wellness Recommendations
        </h2>

        <ul>

          {
            activeSuggestions.map(
              (item, index) => (
                <li key={index}>
                  {item}
                </li>
              )
            )
          }

        </ul>

      </div>

    </div>
            </>
  )

}

export default DashboardPage 
