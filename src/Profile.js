import React, { useState } from 'react';
import JoblyApi from "./HelperApi";
import ProfileForm from "./ProfileForm";
import AppliedJobs from "./AppliedJobs";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './Profile.css';

//Parent component of Jobs applied and Profile Form -
//shows basic information on currentUser, with applied jobs component and edit form component

function Profile({ currentUser }) {
  let { first_name, last_name, email, photo_url, username } = currentUser


  const [showForm, setShowForm] = useState(false);

  const userJobs = currentUser.jobs;
  console.log("these are current user's jobs:", userJobs)


  function toggleFormButton() {
    setShowForm(!showForm);
  }

  function handleUnapply() {
    //nothing yet
  }


  //renders list of jobs if currentUser has any - otherwise returns 'no jobs'



  console.log("these are user's jobs in profileForm \n\n", userJobs);

  if (!showForm) {
    return (
      <div>
        <Row>
          <Col className="bg-white" lg="4" md="12">
            <img className="profilepic px-3 mt-5" src={photo_url} alt=" img of user"></img>
            <div className="text-left px-3 primary-font mb-5">
              <p><b>Name:</b><br />{`${first_name} ${last_name}`}</p>
              <p><b>Email:</b><br />{email} </p>
              <p><b>Bio:</b><br />Vaporware franzen craft beer, mixtape disrupt narwhal
            locavore offal drinking vinegar sustainable polaroid. Lumbersexual lyft truffaut
             williamsburg fixie craft beer brooklyn synth hoodie. Edison bulb YOLO DIY whatever
             subway tile migas knausgaard actually readymade gentrify waistcoat viral typewriter
             tousled umami. Offal single-origin coffee taiyaki shaman, brunch af blue bottle wayfarers
             cle salvia man bun sustainable trust fund. Skateboard leggings celiac, cronut seitan wolf
             hexagon live-edge four loko portland organic brooklyn. </p>
            </div>
            <Button variant="dark" onClick={toggleFormButton}>Edit Info</Button>
          </Col>

          <Col style={{ minHeight: "100vh" }} lg="8" md="12">
            <div className="mx-3">
              <h2 className="text-white primary-font mt-5" >Here are your applied jobs.</h2>
              <h5 className="secondary-font">Unapply with a single click.</h5>
            </div>
            <div className="mt-5">
              {/* <AppliedJobs userJobs={userJobs} /> */}
            </div>
          </Col>
        </Row>

      </div>
    )

  }
  return (
    <div className="app">
      <ProfileForm currentUser={currentUser} />
      <button onClick={toggleFormButton}>Cancel</button>
    </div>
  )

}

export default Profile;