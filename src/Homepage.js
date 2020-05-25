import React, { useContext } from 'react';
import TokenContext from "./TokenContext";
import { Link } from "react-router-dom";
import "./Homepage.css"



function HomePage() {
  const token = useContext(TokenContext)
  const userName = localStorage.getItem("username");

  if (userName !== null ) {
    return (
      <div>
        <h1> Welcome Back!</h1>
        <h3> Start your job search now.</h3>
        <img className="companyPhoto" src="https://images.pexels.com/photos/6224/hands-people-woman-working.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"></img><br />
        <Link to="/companies"><button>Search</button></Link>
      </div>
    )

  } else {
    return (
      <div className="cardbody">
        <h1>Welcome to Career Cat!</h1>
        <img className="companyPhoto" src="https://images.pexels.com/photos/7097/people-coffee-tea-meeting.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"></img>
      <h3>Find Your Purpose. Find Your Culture.</h3>
        <p className="aboutBlurb">
        Not only does Career Cat offer the  most competitive cutting-edge jobs  
        for our users; We want our users to find their ideal company environment. 
        We want to link companies with the perfect employee, from work-life balance, to relevant skillset, to social environment.
        We don't just want you to find a new job - we want you to find your new work family. 
        Career Cat also has plenty of benefits for company accounts, from editing and adding positions and information 
        on the fly, to expansive powerful admin features. More and more features are being 
        added daily - Career Cat is a growing company!
        </p>
        <h4>Log in or sign up to start your search today.</h4>
        <Link to="/login"><button>Log In/Register</button></Link>
      </div>
    )
  }

}

export default HomePage