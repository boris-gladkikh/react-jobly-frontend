import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';
import "./NavBar.css";
import TokenContext from "./TokenContext";
import { useHistory } from "react-router-dom";


function NavBar() {
  const {token, setToken} = useContext(TokenContext);
  const history = useHistory();


  function handleLogout(){
    window.localStorage.clear();
    setToken("");
    console.log("localStorage is:", localStorage);
    history.push('/');
  }

  if(token !== ""){
  return (
    <nav>
      <ul>
        <li><NavLink exact to="/">Home</NavLink></li>
        <li><NavLink exact to="/companies">Companies</NavLink></li>
        <li><NavLink exact to="/jobs">Jobs</NavLink></li>
        <li><NavLink exact to="/profile">Profile</NavLink></li>
        {/* <li><NavLink exact to="/login">Log In</NavLink></li> */}
        <li><NavLink onClick={handleLogout} exact to="/">Log Out</NavLink></li>
      </ul>
    </nav>
  )
  } else {
  return(
    <nav>
      <ul>
        <li><NavLink exact to="/">Home</NavLink></li>
        <li><NavLink exact to="/login">Log In</NavLink></li>
      </ul>
    </nav>
  )
  }

}

export default NavBar