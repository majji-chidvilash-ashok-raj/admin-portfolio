import { useState } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://portfolio-backend-0ed0.onrender.com/api/admin/login",
        { email, password }
      );
       setError(res.data.message);

      if (res.data.success) {
         localStorage.setItem("token", res.data.token);
        navigate("/admin/dashboard");
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="login-page">
      <div className="log-cont">
        <h1>Admin Login</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <div className="error-msg" style={{ textAlign: "center" }}>
              {error}
            </div>
          )}

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
