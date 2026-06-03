import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import API from "../services/api";

function LoginPage() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response = await API.post(
        "/login",
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "token",
        response.data.token || "logged_in"
      );

      alert("Login Successful");

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert("Login Failed");

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="auth-page">

      <div className="auth-card">

        <h1>
          Welcome Back
        </h1>

        <p>
          Login to continue your mental wellness journey.
        </p>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Enter Email"

            value={email}

            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Enter Password"

            value={password}

            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            type="submit"
          >
            {
              loading
                ? "Logging In..."
                : "Login"
            }
          </button>

        </form>

        <div className="auth-footer">

          <span>
            Don't have an account?
          </span>

          <Link to="/register">
            Register
          </Link>

        </div>

      </div>

    </div>
  );
}

export default LoginPage;