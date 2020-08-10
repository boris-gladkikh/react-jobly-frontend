import React, { useState } from 'react';
import ProfileForm from "./ProfileForm";
import AppliedJobs from "./AppliedJobs";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import LoadingSpinner from './LoadingSpinner';
import './Profile.css';

//Parent component of Jobs applied and Profile Form -
//shows basic information on currentUser, with applied jobs component and edit form component

function Profile({ currentUser }) {
  let { first_name, last_name, email, photo_url, username } = currentUser


  const [showForm, setShowForm] = useState(false);

  const userJobs = currentUser.jobs;

  function toggleFormButton() {
    setShowForm(!showForm);
  }

  if(!currentUser){
    return <LoadingSpinner />
  }

  if (!showForm) {
    console.log("this is currentUser in profile upon registering", currentUser);
    return (
      <div>
        <Row>
          <Col className="bg-white" lg="4" md="12">
            <div className="px-3 mt-5">
              <img className="profilepic " src={photo_url} alt=" img of user"></img>
              <hr></hr>
            </div>
            <div className="text-left px-3 primary-font mb-5">
              <p><b>Username:</b><br />{username}</p>
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
            <Button className="mb-5" variant="dark" onClick={toggleFormButton}>Edit Info</Button>
          </Col>

          <Col style={{ minHeight: "100vh" }} lg="8" md="12">
            <div className="mx-3">
              <h2 className="text-white primary-font mt-5" >Here are your applied jobs.</h2>
              <h5 className="secondary-font">Most employers typically respond in 7-10 days.</h5>
            </div>
            <div className="mt-5">
              <AppliedJobs userJobs={userJobs} />
            </div>
          </Col>
        </Row>

      </div>
    )

  }
  return (
    <div className="app">
      <ProfileForm currentUser={currentUser} toggleFormButton={toggleFormButton} />
    </div>
  )

}

export default Profile;