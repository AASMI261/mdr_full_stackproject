import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();   // 👈 added

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/password/forgot-password",
        { email }
      );

      alert(res.data.message);

      // ✅ If success → go to Home page
      navigate("/home");

    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
      // ❌ No navigation if error
    }
  };

  return (
    <div className="login-form">
      <h2>Forgot Password</h2>
      <p>Enter your email and we’ll send you a reset link.</p>

      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Email ID</legend>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </fieldset>

        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
}

export default ForgotPassword;