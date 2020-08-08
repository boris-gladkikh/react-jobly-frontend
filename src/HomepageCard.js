import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import './HomepageCard.css';


function HomepageCard(){
  return (
    <div className="w-75 mt-5 m-auto pt-5 pb-5 px-2 ">
    <Container>
    <Row>
      <Col  md="12" lg="4">
        <div className="mx-3  cardie">
        <i className=" fa-10x fas fa-cat"></i>
          <p className="mt-3 card-font">
            Career Cat provides the most relevant, cutting-edge jobs for our users.
          </p>
        </div>
      </Col>
      <Col  md="12" lg="4">
        <div className="mx-3  cardie">
        <i className=" fa-10x fas fa-laptop"></i>
          <p className="mt-3 card-font">
            We link companies with the perfect employee, from skills, to culture, to work life balance.
          </p>
        </div>
      </Col>
      <Col  md="12" lg="4">
        <div className="mx-3  cardie">
          <i className=" fa-10x fas fa-users"></i>
          <p className="mt-3 card-font">
            We don't just help you find a new job-we help you find your new work family.
          </p>
        </div>
      </Col>

    </Row>
    </Container>
  </div>

  )

}

export default HomepageCard
