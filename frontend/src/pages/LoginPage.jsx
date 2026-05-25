import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import "../styles/auth.css"
import API from "../services/api"

function LoginPage() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleLogin = async () => {

    try {

      const response = await API.post(
        "/login",
        formData
      )

      alert(response.data.message)

      navigate("/dashboard")

    } catch (error) {

      alert("Login failed")

    }

  }

  return (
    <div className="auth-container">

      <div className="auth-box">

        <h1 className="auth-title">
          Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          className="auth-input"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          className="auth-input"
          onChange={handleChange}
        />

        <button
          className="auth-button"
          onClick={handleLogin}
        >
          Login
        </button>

        <div className="auth-link">
          <p>
            Don't have an account?
            <Link to="/register"> Register</Link>
          </p>
        </div>

      </div>

    </div>
  )
}

export default LoginPage