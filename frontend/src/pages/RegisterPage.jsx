import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import API from "../services/api";

function RegisterPage() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response = await API.post(
        "/signup",
        formData
      );

      alert(response.data.message);

      navigate("/login");

    } catch (error) {

      console.log(error);

      alert("Registration Failed");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="auth-page">

      <div className="auth-card">

        <h1>
          Create Account
        </h1>

        <p>
          Start your AI-powered mental wellness journey.
        </p>

        <form onSubmit={handleRegister}>

          <input
            type="text"
            name="name"

            placeholder="Full Name"

            value={formData.name}

            onChange={handleChange}
          />

          <input
            type="email"
            name="email"

            placeholder="Email Address"

            value={formData.email}

            onChange={handleChange}
          />

          <input
            type="password"
            name="password"

            placeholder="Create Password"

            value={formData.password}

            onChange={handleChange}
          />

          <button
            type="submit"
          >
            {
              loading
                ? "Creating Account..."
                : "Register"
            }
          </button>

        </form>

        <div className="auth-footer">

          <span>
            Already have an account?
          </span>

          <Link to="/login">
            Login
          </Link>

        </div>

      </div>

    </div>

  );
}

export default RegisterPage;