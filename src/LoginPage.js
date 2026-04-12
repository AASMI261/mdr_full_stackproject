// LoginPage.js
import React from "react";
import { useParams } from "react-router-dom";
import "./RoleLoginPage.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function LoginPage() {
  const { role } = useParams();
  const navigate = useNavigate(); // ✅ define navigate

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Login submitted for ${role}`);
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password"); // ✅ works now
  };

   const OnSubmit = (e) => {
    e.preventDefault();

    // your validation logic here

    navigate("/home"); // <-- opens Home.js
  };


  return (
    <div className="login-form">
        {/* Centered Image */}
      <img
        src="https://www.akrateam.com/wp-content/uploads/2024/05/shutterstock_2409498067-MDR-5000x2617-TEXT-1024x536.jpg"
        alt="Hospital Interface"
        className="login-image"
      />

      <h2>{role} Login</h2>
      <form onSubmit={handleSubmit}>
        <fieldset>
         <legend>Email ID</legend>
        <input type="email" placeholder="Enter your email" required />
        </fieldset>

        <fieldset>
        <legend>Password</legend>
        <input type="password" placeholder="Enter your password" required />
        </fieldset>
        
        <button onClick={() => navigate("/home")}>
        <Link to="/patient-management">Submit</Link>
        </button>

      </form><br></br> <hr></hr>
      <p className="forgot-password" onClick={handleForgotPassword}>
        <a src="C:\Users\rabar\Desktop\mdr\hms\src\ForgotPassword.js">Forgot Password?</a>
      </p>

      <p className="forgot-password" onClick={() => navigate("/sign-up")}>
      <a src="C:\Users\rabar\Desktop\mdr\hms\src\SignUpPage.js">Sign Up</a>
      </p>
    </div>
  );
}

export default LoginPage;