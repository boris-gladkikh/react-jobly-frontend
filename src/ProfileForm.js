import React, { useState, useEffect } from 'react';
import Alert from "./Alert";
import { Link } from "react-router-dom";
import JoblyApi from "./HelperApi";

import "./ProfileForm.css";

function ProfileForm({ currentUser }) {
  let { first_name, last_name, email, photo_url, username } = currentUser
  const INITIAL_DATA = {
    first_name,
    last_name,
    email,
    password: "",
    photo_url
  }
  const [formData, setFormData] = useState({ ...INITIAL_DATA });
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);

  const userJobs = currentUser.jobs;
  console.log("these are current user's jobs:", userJobs)


  // set authorization
  // make a patch request to the server
  // initial form data to be current user info without password
  // implement re-enter password
  // const [formData, setFormData] = useState({});

  //sends updated form data to backend via API function, resets form data with response


  useEffect(function update() {
    async function patchFormData(username, data) {
      try {
        setIsLoading(true);
        let response = await JoblyApi.updateProfile(username, data)
        setFormData({ ...response })
      }
      catch (err) {
        console.log("Error!", err)
        setErrorMessage(errors => (
          [...errors, err]
        ))
      }
      finally {
        setIsLoading(false);
      }
    }
    if (isUpdating === true) {
      patchFormData(username, formData)
      setIsUpdating(false);
    }

  }, [isUpdating])


  function handleSubmit(evt) {
    evt.preventDefault();
    setIsUpdating(true)
    // setFormData({...INITIAL_DATA})
  }


  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(currentData => (
      {
        ...currentData,
        [name]: value
      }
    ));
  }


  function toggleFormButton() {
    setShowForm(!showForm);
  }

  function handleUnapply(){}

  //renders list of jobs if currentUser has any - otherwise returns 'no jobs'

  let jobsApplied = 
    userJobs.map(job=><p>{job.title} <button className="smallDeleteButton" onClick={handleUnapply}>X</button></p>)


  console.log("these are user's jobs in profileForm \n\n", userJobs);

  if (isLoading === true) {
    return (
      <div>
        <h5>Loading...</h5>
      </div>
    )
  }

  if (showForm === false) {
    return (

      <div className="profilepage">
        <h2>{`Welcome Back, ${currentUser.first_name}!`}</h2>
        <div className="flexContain">
          <img className="profilepic" src={photo_url} alt=" img of user"></img>
          <div className="personalInfo">
            <h5>Personal Information</h5>
            <p>Name:{`${first_name} ${last_name}`}</p>
            <p>email:{email} </p>
          </div>
        </div>
        <button onClick={toggleFormButton}>Edit Info</button>
        <h2>Jobs Applied:</h2>
        {jobsApplied}


      </div>
    )

  } else {

    return (
      <div className="profilepage">
        <h2>{`Welcome Back, ${currentUser.first_name}!`}</h2>

        <form className="registerform" onSubmit={handleSubmit}>
          <label htmlFor="first_name"></label>
          <input placeholder="First Name" onChange={handleChange} value={formData.first_name} name="first_name"></input><br />
          <label htmlFor="last_name"></label>
          <input placeholder="Last Name" onChange={handleChange} value={formData.last_name} name="last_name"></input><br />
          <label htmlFor="email"></label>
          <input placeholder="Email" onChange={handleChange} value={formData.email} name="email"></input><br />
          <label htmlFor="password" ></label>
          <input placeholder="Re-Enter Password" onChange={handleChange} name="password"></input><br />
          <label htmlFor="photo_url" ></label>
          <input placeholder="Photo URL" onChange={handleChange} name="photo_url"></input><br />
          <button type="submit">Submit</button>
          <button onClick={toggleFormButton} type="button">Cancel</button>

          <div ><Alert errors={errorMessage} /></div>
        </form>
      </div>
    )

  }



}

export default ProfileForm;