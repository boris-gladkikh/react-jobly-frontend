import React, { useContext } from 'react';
import LoginSignupForm from "./LoginSignupForm";
import TokenContext from "./TokenContext";
import { Link } from "react-router-dom";



function HomePage() {
  const token = useContext(TokenContext)

  if (token.token !== "" && token.token !== undefined) {
    return (
      <div>
        <h2> Welcome Back!</h2>
        <h6> Start your job Seach Now.</h6>
        <Link to="/companies"><button>Search</button></Link>
      </div>
    )

  } else {
    return (
      <div className="cardbody">
        <h1>Welcome to Career Cat!</h1>
        <h3>Find Your Dream Job. Today.</h3>
        <h6>Log in or sign up to start your search today.</h6>
        <LoginSignupForm />
      </div>
    )
  }

}

export default HomePage