import React, { useState, useEffect } from 'react';
import JoblyApi from "./HelperApi";
import ProfileForm from "./ProfileForm";
import AppliedJobs from "./AppliedJobs";
import "./Profile.css";

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
    //nothingf yet
  }


  //renders list of jobs if currentUser has any - otherwise returns 'no jobs'



  console.log("these are user's jobs in profileForm \n\n", userJobs);

  if (showForm === false) {
    return (
      <div>
        <h2>{`Welcome Back, ${currentUser.first_name}!`}</h2>
        <h4>Here you can find your profile details and jobs you have applied to.</h4>
        <p>Click the button next to each job to unapply!</p>

        <div className="flexContain">
          <div className="leftContainer">
            <img className="profilepic" src={photo_url} alt=" img of user"></img>
            <h3>Personal Information</h3>
            <p><b>Name:</b>{`${first_name} ${last_name}`}</p>
            <p><b>Email:</b>{email} </p>
            <p><b>Bio:</b>Vaporware franzen craft beer, mixtape disrupt narwhal 
            locavore offal drinking vinegar sustainable polaroid. Lumbersexual lyft truffaut
             williamsburg fixie craft beer brooklyn synth hoodie. Edison bulb YOLO DIY whatever 
             subway tile migas knausgaard actually readymade gentrify waistcoat viral typewriter 
             tousled umami. Offal single-origin coffee taiyaki shaman, brunch af blue bottle wayfarers 
             cle salvia man bun sustainable trust fund. Skateboard leggings celiac, cronut seitan wolf 
             hexagon live-edge four loko portland organic brooklyn. </p>
          </div>
          <div className="rightContainer">
            <AppliedJobs userJobs={userJobs} />
          </div>
        </div>

        <button onClick={toggleFormButton}>Edit Info</button>




      </div>
    )

  } else {
    return (
      <div>
        <ProfileForm currentUser={currentUser} />
        <button onClick={toggleFormButton}>Cancel</button>
      </div>
    )
  }




}

export default Profile;