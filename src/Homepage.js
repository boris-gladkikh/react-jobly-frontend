import React, { useContext } from 'react';
import TokenContext from "./TokenContext";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';



function HomePage() {
  const token = useContext(TokenContext)
  const userName = localStorage.getItem("username");

  if (userName !== null) {
    return (
      <div>
        <h1 className="primary-font"> Welcome Back!</h1>
        <h3> Start your job search now.</h3>
        <Link to="/companies"><Button variant="dark">Search</Button></Link>
      </div>
    )

  } else {
    return (
      <div className="app">
        <div className="mt-5 px-2">
          <h1 className="primary-font">Welcome to Career Cat!</h1>
          <h2 className="text-white secondary-font">Find Your Purpose. Find Your Culture.</h2>
        </div>
        <div className="w-50  mt-5 m-auto pt-5 px-2">
          <Container>
          <Row>
            <Col xs="12" lg="4">
              <div className="mx-1">
              <i className=" fa-10x fas fa-cat"></i>
                <p className="mt-3 card-font">
                  Career Cat provides the most relevant, cutting-edge jobs for our users.
                </p>
              </div>
            </Col>
            <Col xs="12" lg="4">
              <div className="mx-1">
              <i className=" fa-10x fas fa-laptop"></i>
                <p className="mt-3 card-font">
                  We link companies with the perfect employee, from skills, to culture, to work life balance.
                </p>
              </div>
            </Col>
            <Col xs="12" lg="4">
              <div className="mx-1">
                <i className=" fa-10x fas fa-users"></i>
                <p className="mt-3 card-font">
                  We don't just help you find a new job-we help you find your new work family.
                </p>
              </div>
            </Col>

          </Row>
          </Container>
        </div>

        <div className="mt-5">
        <h4 className="primary-font">Log in or sign up to start your search today.</h4>
        <Link to="/login">
          <Button className="mt-4" variant="dark">Log In/Register</Button>
          </Link>
      </div>

        </div>

    )
  }

}

export default HomePage