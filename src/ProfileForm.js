import React, { useState, useEffect } from 'react';
import Alert from "./Alert";
import JoblyApi from "./HelperApi";
import LoadingSpinner from './LoadingSpinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


// import "./ProfileForm.css";

function ProfileForm({ currentUser, toggleFormButton }) {
  let { first_name, last_name, email, photo_url, username, bio } = currentUser
  const INITIAL_DATA = {
    first_name,
    last_name,
    email,
    bio,
    password: "",
    photo_url
  }
  const [formData, setFormData] = useState({ ...INITIAL_DATA });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);

  // set authorization
  // make a patch request to the server
  // initial form data to be current user info without password
  // implement re-enter password
  // const [formData, setFormData] = useState({});

  //sends updated form data to backend via API function, resets form data with response


  useEffect(function update() {
    async function patchFormData(username, data) {
      try {
        let response = await JoblyApi.updateProfile(username, data)
        setFormData({ ...response });
        window.location.reload();

      }
      catch (err) {
        console.log("Error!", err)
        setErrorMessage(errors => (
          [...errors, err]
        ))
      }
    }
    if (isUpdating) {
      patchFormData(username, formData)
      setIsUpdating(false);
    }

  }, [isUpdating, username, formData])


  function handleSubmit(evt) {
    evt.preventDefault();
    setIsLoading(true);
    setIsUpdating(true);
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

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <>
      <div className="mt-5 px-2">
        <h1 className="primary-font"> Edit your profile</h1>
        <h3 className="text-white secondary-font">Add a profile image and tell us about yourself.</h3>

      </div>
      <div className="mt-5 form-container">
        <Form className="w-75 p-3 m-auto mt-5" onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="first_name"></Form.Label>
            <Form.Control placeholder="First Name" onChange={handleChange} value={formData.first_name} name="first_name"></Form.Control>
          </Form.Group>

          <Form.Group>
          <Form.Label htmlFor="last_name"></Form.Label>
          <Form.Control placeholder="Last Name" onChange={handleChange} value={formData.last_name} name="last_name"></Form.Control>
          </Form.Group>

          <Form.Group>
          <Form.Label htmlFor="email"></Form.Label>
          <Form.Control placeholder="Email" onChange={handleChange} value={formData.email} name="email"></Form.Control>
          </Form.Group>


          <Form.Group>
          <Form.Label htmlFor="photo_url" ></Form.Label>
          <Form.Control placeholder="Photo URL" onChange={handleChange} value={formData.photo_url}  name="photo_url"></Form.Control>
          </Form.Group>
          
          <Form.Group>  
          <Form.Label htmlFor="bio" ></Form.Label>
          <Form.Control placeholder="Bio - Be descriptive!" as="textarea" rows="4" onChange={handleChange} value={formData.bio} name="bio"></Form.Control>
          </Form.Group>

          <Form.Group>
          <Form.Label htmlFor="password" ></Form.Label>
          <Form.Control placeholder="Re-Enter Password" type="password" onChange={handleChange} name="password"></Form.Control>
          <Form.Text>Please re-enter password to submit changes.</Form.Text>
          </Form.Group>

          <Button variant="dark" type="submit">Submit</Button>
          <Button variant="dark" className="ml-2" onClick={toggleFormButton}>Cancel</Button>

          <div className="mt-5" ><Alert errors={errorMessage} /></div>
        </Form>
      </div>
    </>
  )





}

export default ProfileForm;