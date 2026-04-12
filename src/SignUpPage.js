import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RoleLoginPage.css";

function SignUpPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.type === "tel" ? "mobile" : e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        alert("User Registered Successfully!");
        navigate("/");
      } else {
        alert(data.message);
      }

    } catch (err) {
      console.error(err);
      alert("Server Error");
    }
  };

  return (
    <div className="login-form">
      <h2>Sign Up Form</h2>

      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Name</legend>
          <input
            type="text"
            name="name"
            required
            onChange={handleChange}
          />
        </fieldset>

        <fieldset>
          <legend>Mobile Number</legend>
          <input
            type="tel"
            name="mobile"
            required
            onChange={handleChange}
          />
        </fieldset>

        <fieldset>
          <legend>Email</legend>
          <input
            type="email"
            name="email"
            required
            onChange={handleChange}
          />
        </fieldset>

        <fieldset>
          <legend>Set Password</legend>
          <input
            type="password"
            name="password"
            required
            onChange={handleChange}
          />
        </fieldset>

        <button type="submit">Submit</button>
      </form>

      <p>
        <button type="button" onClick={() => navigate("/")}>
          Back to Login
        </button>
      </p>
    </div>
  );
}

export default SignUpPage;