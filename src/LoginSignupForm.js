import React, { useState, useEffect, useContext } from 'react';
import JoblyApi from "./HelperApi";
import { useHistory } from "react-router-dom";
import TokenContext from "./TokenContext";
import Alert from './Alert';
import "./login.css";
import {Form, Label,Input, Button} from "reactstrap";

// parent component of alert, child component of homepage,routes
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
  const [hideLogin, setHideLogin] = useState('Hidden');
  const [hideSignup, setHideSignup] = useState('Hidden');
  //spread initial data insise formData state, so there's no way for anyone to edit OG reference!!!
  const [formData, setFormData] = useState({...initialData});
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
        setErrorMessage(messages=>([
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
        setErrorMessage(messages=>([
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

  function handleRegisterButton() {
    setHideLogin("Hidden");
    setHideSignup("");
  }

  function handleLoginButton() {
    setHideLogin("");
    setHideSignup("Hidden");
  }

  return (
    <div>

      <Button color="primary" onClick={handleLoginButton}>Login</Button>
      <Button onClick={handleRegisterButton}>Register</Button>
      <Form className={`"loginForm" registerform ${hideLogin}`} onSubmit={handleSubmitLogin}>
        <Label htmlFor="username"></Label>
        <Input  placeholder="Username" onChange={handleChange} value={formData.username} name="username"></Input><br />
        <Label htmlFor="password" ></Label>
        <Input  type="password"  placeholder="Password" onChange={handleChange} value={formData.password} name="password"></Input><br />
        <button className="registerButton" type="submit">Submit</button>
        <div ><Alert errors={errorMessage} /></div>
      </Form>

      <form className={`"signUpForm" registerform ${hideSignup}`} onSubmit={handleSubmitSignUp}>
        <label htmlFor="first_name"></label>
        <input placeholder="First Name"onChange={handleChange} value={formData.first_name} name="first_name"></input><br />
        <label htmlFor="last_name"></label>
        <input placeholder="Last Name" onChange={handleChange} value={formData.last_name} name="last_name"></input><br />
        <label htmlFor="email"></label>
        <input placeholder="Email" onChange={handleChange} value={formData.email} name="email"></input><br />
        <label htmlFor="username"></label>
        <input placeholder="Username" onChange={handleChange} value={formData.username} name="username"></input><br />
        <label htmlFor="password" ></label>
        <input placeholder="Password" onChange={handleChange} value={formData.password} name="password" type="password"></input><br />
        <button type="submit">Submit</button>
        <div ><Alert errors={errorMessage} /></div>
      </form>
    </div>
  )

}

export default LoginSignupForm;