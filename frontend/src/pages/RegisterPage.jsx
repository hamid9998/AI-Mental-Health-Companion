import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import "../styles/auth.css"
import API from "../services/api"

function RegisterPage() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleRegister = async () => {

    try {

      const response = await API.post(
        "/signup",
        formData
      )

      alert(response.data.message)

      navigate("/login")

    } catch (error) {

      alert("Registration failed")

    }

  }

  return (
    <div className="auth-container">

      <div className="auth-box">

        <h1 className="auth-title">
          Create Account
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Enter full name"
          className="auth-input"
          onChange={handleChange}
        />

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
          onClick={handleRegister}
        >
          Register
        </button>

        <div className="auth-link">
          <p>
            Already have an account?
            <Link to="/login"> Login</Link>
          </p>
        </div>

      </div>

    </div>
  )
}

export default RegisterPage