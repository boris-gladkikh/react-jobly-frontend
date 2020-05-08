import React, { useState, useEffect } from 'react';
import Alert from "./Alert";
import { Link } from "react-router-dom";
import JoblyApi from "./HelperApi";

import "./ProfileForm.css";

function ProfileForm({ currentUser }) {
  let { first_name, last_name, email, photo_url,username } = currentUser
  const INITIAL_DATA = {
    username,
    first_name,
    last_name,
    email,
    password: "password",
    photo_url:"https://images.unsplash.com/photo-1508280756091-9bdd7ef1f463?ixlib=rb-1.2.1&w=1000&q=80"
  }
  const [formData, setFormData] = useState({ ...INITIAL_DATA });
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);


  // set authorization
  // make a patch request to the server
  // initial form data to be current user info without password
  // implement re-enter password
  // const [formData, setFormData] = useState({});

  //sends updated form data to backend via API function, resets form data with response
  

  useEffect(function update(){
    async function patchFormData(username,data){
      try{
        setIsLoading(true);
        let response = await JoblyApi.updateProfile(username,data)
        setFormData({...response})
      }
      catch(err){
        console.log("Error!",err)
        setErrorMessage(errors=>(
          [...errors, err]
        ))
      }
      finally {
        setIsLoading(false);
      }
    }
    if(isUpdating === true){
      patchFormData(username,formData)
      setIsUpdating(false);
    }
      
  },[username, formData, isUpdating])


  function handleSubmit(evt) {
    evt.preventDefault();
    setIsUpdating(true)
    setFormData({...INITIAL_DATA})
   }


  function handleChange(evt) {
    const {name, value} = evt.target;
    setFormData(data=>(
      {
      ...data,
      [name]: value
    }
    ))
   }

  //  function onChange(evt) {
  //   const { name, value } = evt.target;
  //   setPostFormData(currentData => (
  //     {
  //       ...currentData,
  //       [name]: value
  //     }
  //   ));
  // }

  function toggleFormButton() {
    setShowForm(!showForm);
  }


  if(isLoading === true) {
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
        <img className="profilepic" src={photo_url} alt=" img of user"></img>
        <h5>Personal Information</h5>
        <p>Name:{`${first_name} ${last_name}`}</p>
        <p>email:{email} </p>
        <h4>Jobs Applied: 0</h4>
        <button onClick={toggleFormButton}>Edit Form</button>
        <Link to="/jobs"><button>See  Applied Jobs</button></Link>

      </div>
    )

  } else {

    return (
      <div className="profilepage">
        <h2>{`Welcome Back, ${currentUser.first_name}!`}</h2>

        <form className="registerform" onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input onChange={handleChange} value={formData.username} name="username"></input><br />
          <label htmlFor="last_name">Last Name:</label>
          <label htmlFor="first_name">First Name:</label>
          <input onChange={handleChange} value={formData.first_name} name="first_name"></input><br />
          <label htmlFor="last_name">Last Name:</label>
          <input onChange={handleChange} value={formData.last_name} name="last_name"></input><br />
          <label htmlFor="email">E-mail:</label>
          <input onChange={handleChange} value={formData.email} name="email"></input><br />
          <label htmlFor="password" >Re-enter Password:</label>
          <input onChange={handleChange} value={formData.password} name="password"></input><br />
          <label htmlFor="photo_url" >Photo URL:</label>
          <input onChange={handleChange} value={formData.photo_url} name="photo_url"></input><br />
          <button type="submit">Submit</button>
          <button  onClick={toggleFormButton}type="button">Cancel</button>

          <div ><Alert errors={errorMessage} /></div>
        </form>
      </div>
    )

  }



}

export default ProfileForm;