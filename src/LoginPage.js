import React from 'react';
import "./login.css";
import LoginSignupForm from "./LoginSignupForm";
import logo from "./catlogo.png"

function LoginPage() {
  return (
    <div>
      <img className="ccLogoBigger" src={logo} alt="cc logo"></img>
      {/* <h2>Log In/Sign Up</h2> */}

      <LoginSignupForm />
      <div className="smolText">
      <p>
        <i>
        “The noblest pleasure is the joy of understanding.” – Leonardo da Vinci
        </i>
        </p>
      <p>
        <i>
        “Find out what you like doing best, and get someone to pay you for doing it.” – Katharine Whitehorn
        </i>
        </p>
      </div>
    </div>
  )

}

export default LoginPage