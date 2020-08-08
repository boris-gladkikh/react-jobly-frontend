import React, { useState, useEffect, useContext } from 'react';
import JoblyApi from "./HelperApi";
import { useHistory } from "react-router-dom";
import TokenContext from "./TokenContext";
import Alert from './Alert';
import "./login.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// parent of alert, child of homepage,routes
//renders forms, sends request, receives token or error based on response,
//authenticates user or Alerts user to error, redirects to company page upon login

function LoginSignupForm() {
  const history = useHistory();
  const initialData = {
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    email: ''
  }
  const [formToggle, setFormToggle] = useState(false);
  //spread initial data insise formData state, so there's no way for anyone to edit OG reference!!!
  const [formData, setFormData] = useState({ ...initialData });
  const [logginIn, setlogginIn] = useState(false);
  const [signingUp, setsigningUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);
  const { setToken } = useContext(TokenContext);



  /*invokes our login/register requests (depending on which form is submitted)
    then resets our submit click states, and hides error messages if exposed
  */


  useEffect(function registerOrLogin() {
    async function logIn() {
      /*uses login request method, sets token state with response, saves token in 
      localStorage, redirects to companies once logged in via history */

      try {
        let response = await JoblyApi.login(formData);
        window.localStorage.setItem('token', response);
        window.localStorage.setItem('username', formData.username);
        setToken(response);
        history.push("/companies");
      }
      catch (err) {
        setErrorMessage(messages => ([
          ...messages, ...err
        ]));
        // alert("Something went wrong. with login");
        console.error(err);
      }
    }

    async function signUp() {
      /*uses register request method, sets token state with response, saves token in 
      localStorage, redirects to companies once logged in via history */
      try {
        let response = await JoblyApi.signup(formData);
        window.localStorage.setItem('token', response);
        setToken(response);
        history.push("/companies");
      } catch (err) {
        console.log("this is err thats breaking it", err)
        setErrorMessage(messages => ([
          ...messages, ...err
        ]));
        // alert('Something went wrong with signup!');
        console.error(err);
      }

    }


    if (logginIn) {
      logIn();
      setlogginIn(false);
      setFormData(initialData);
      setErrorMessage([]);


    }
    else if (signingUp) {
      signUp();
      setsigningUp(false);
      setFormData(initialData);
      setErrorMessage([]);
    }


  }, [signingUp, logginIn, formData, initialData, setToken, history])


  //upon signUp submit, changes click state to trigger useEffect

  function handleSubmitSignUp(evt) {
    evt.preventDefault();
    setsigningUp(true);
    //checks localStorage to make sure it does what we want
    console.log("signup", localStorage);
  }

  //upon logIn submit, changes click state to trigger useEffect

  function handleSubmitLogin(evt) {
    evt.preventDefault();
    setlogginIn(true);
    //checks localStorage to make sure it does what we want
    console.log("login", localStorage);

  }

  // on data change, sets form data

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({
      ...data,
      [name]: value
    }))
  }

  //toggles our register/login forms to view the appropriate form

  function formSwitch() {
    setFormToggle(!formToggle);

  }

  if (formToggle) {
    return (
      <div className="">
        <div className="mt-5 mb-5">
          <Button variant="dark" onClick={formSwitch}>Login/Register</Button>
        </div>
        <div className="mt-5 form-container">
          <h3 className="mt-2 secondary-font">Register!</h3>
          <Form className="p-3 w-75 m-auto" onSubmit={handleSubmitSignUp}>
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
            <Form.Label htmlFor="username"></Form.Label>
            <Form.Control placeholder="Username" onChange={handleChange} value={formData.username} name="username"></Form.Control>
            </Form.Group>

            <Form.Group>
            <Form.Label htmlFor="password" ></Form.Label>
            <Form.Control placeholder="Password" onChange={handleChange} value={formData.password} name="password" type="password"></Form.Control>
            </Form.Group>

            <Button variant="dark" type="submit">Submit</Button>
            <div ><Alert errors={errorMessage} /></div>
          </Form>
        </div>

      </div>
    )

  }

  return (
    <div className="">

      <div className="mt-5 mb-5">
        <Button variant="dark" onClick={formSwitch}>Login/Register</Button>
      </div>

      <div className="mt-5 form-container">
      <h3 className=" mt-2 secondary-font">Log in!</h3>
      <Form className="w-75 p-3 m-auto mt-5" onSubmit={handleSubmitLogin}>
        <Form.Group>
          <Form.Label htmlFor="username"></Form.Label>
          <Form.Control placeholder="Username" onChange={handleChange} value={formData.username} name="username"></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="password" ></Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={handleChange} value={formData.password} name="password"></Form.Control>
        </Form.Group>
        <Button variant="dark" className="" type="submit">Submit</Button>
        <div ><Alert errors={errorMessage} /></div>
      </Form>
      </div>

    </div>
  )

}

export default LoginSignupForm;