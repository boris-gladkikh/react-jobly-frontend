import React, { useContext } from 'react';
import TokenContext from "./TokenContext";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import HomepageCard from './HomepageCard';



function HomePage() {
  const token = useContext(TokenContext);

  console.log(token);

  if (localStorage.token) {
    return (
      <div className="app mx-3">
        <div className="mt-5 px-2">
        <h1 className="primary-font"> Welcome Back!</h1>
        <h3 className="text-white secondary-font"> Start your job search now.</h3>
        </div>
        <div className="mt-5">
        <h4 className="primary-font">Keep looking - your dream job awaits.</h4>
        <HomepageCard />
        <Link to="/companies">
          <Button className="mb-5 mt-4" variant="dark">Companies</Button>
          </Link>
      </div>
      </div>
    )

  } else {
    return (
      <div className="app mx-3">
        <div className="mt-5 px-2">
          <h1 className="primary-font">Welcome to Career Cat!</h1>
          <h2 className="text-white secondary-font">Find Your Purpose. Find Your Culture.</h2>
        </div>
        <HomepageCard />
        <div className="mt-5">
        <h4 className="primary-font">Log in or sign up to start your search today.</h4>
        <Link to="/login">
          <Button className="mb-5 mt-4" variant="dark">Log In/Register</Button>
          </Link>
      </div>

        </div>

    )
  }

}

export default HomePage