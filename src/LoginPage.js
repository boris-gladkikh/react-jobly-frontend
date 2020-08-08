import React from 'react';
import "./login.css";
import LoginSignupForm from "./LoginSignupForm";

function LoginPage() {
  return (
    <div className="app">

      <div className="mt-5 px-2">
        <h1 className="primary-font"> Log in/Register</h1>
        <h3 className="text-white secondary-font"> Start your job search now.</h3>
        </div>

      <LoginSignupForm />

      <div className="mt-5">
      <p className="secondary-font text-white">
        “The noblest pleasure is the joy of understanding.” – Leonardo da Vinci
        </p>
      <p className="secondary-font text-white">
        “Find out what you like doing best, and get someone to pay you for doing it.” – Katharine Whitehorn
        </p>
      </div>

    </div>
  )

}

export default LoginPage