import React, { useContext } from 'react';
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
    setToken(localStorage.getItem("token"));
    setCurrentUser({});
    console.log("localStorage is:", localStorage);
    history.push('/login');
  }
  //authenticates which navbar to render based on token state 

  if (token) {
    return (
      <Navbar expand="lg" bg="dark" variant="dark" className="">
        <Navbar.Toggle className="" aria-controls="navigation" />
        <Navbar.Collapse className="" id="navigation">
          <Nav className="text-white  nav-font">
            <Nav.Item>
              <Nav.Link href="/">HOME</Nav.Link>
            </Nav.Item>

            <Nav.Item>
            <Nav.Link href="/companies">COMPANIES</Nav.Link>
            </Nav.Item>

            <Nav.Item>
            <Nav.Link href="/jobs">JOBS</Nav.Link>
            </Nav.Item>

            <Nav.Item>
            <Nav.Link href="/profile">PROFILE</Nav.Link>
            </Nav.Item>

            <Nav.Item>
            <Nav.Link href="/login" onClick={handleLogout} >LOG OUT</Nav.Link>
            </Nav.Item>

          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  } else {
    return (
      <Navbar expand="lg" variant="dark" className="">
        <Navbar.Toggle className="" aria-controls="navigation" />
        <Navbar.Collapse className="" id="navigation">
          <Nav className="nav-font justify-content-end">
            <Nav.Link href="/">HOME</Nav.Link>
            <Nav.Link href="/login">LOGIN</Nav.Link>
          </Nav>
        </Navbar.Collapse>

      </Navbar>
    )
  }

}

export default NavBar