import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import "./NavBar.css";
import TokenContext from "./TokenContext";
import { useHistory } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';



//renders navbar on every page, depending on logged in status of user
function NavBar({ currentUser, setCurrentUser }) {
  const { token, setToken } = useContext(TokenContext);
  const history = useHistory();

  // upon logout, clears localStorage, resets token state (context) and redirects
  //back to homepage via history
  function handleLogout() {
    window.localStorage.clear();
    setToken(undefined);
    setCurrentUser({});
    console.log("localStorage is:", localStorage);
    history.push('/');
  }
  //authenticates which navbar to render based on token state 

  if (token) {
    return (
      <Navbar bg="dark" variant="dark" className="justify-content-end">
        <Nav className="text-white nav-font">
        <Nav.Link href="/">HOME</Nav.Link>
        <Nav.Link href="/companies">COMPANIES</Nav.Link>
        <Nav.Link href="/jobs">JOBS</Nav.Link>
        <Nav.Link href="/profile">PROFILE</Nav.Link>
        <Nav.Link href="/login" onClick={handleLogout} >Log Out</Nav.Link>
        </Nav>
      </Navbar>
    )
  } else {
    return (
      <Navbar variant="dark" className="justify-content-end">
        <Nav className="nav-font">
        <Nav.Link href="/">HOME</Nav.Link>
        <Nav.Link href="/login">LOGIN</Nav.Link>
        </Nav>
      </Navbar>
    )
  }

}

export default NavBar