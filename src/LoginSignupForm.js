import React, { useState, useEffect, useContext } from 'react';
import JoblyApi from "./HelperApi";
import { useHistory } from "react-router-dom";
import TokenContext from "./TokenContext";
import Alert from './Alert';
import "./login.css";

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
  const [formData, setFormData] = useState(initialData);
  const [clickSubmitLogin, setClickSubmitLogin] = useState(false);
  const [clickSubmitSignUp, setClickSubmitSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState('Hidden');
  const { setToken } = useContext(TokenContext);



  /*invokes our login/register requests (depending on which form is submitted)
    then resets our submit click states, and hides error messages if exposed
  */


  useEffect(() => {
    async function logIn() {

      await doLogin(formData);
    }
    async function signUp() {

      await doSignUp(formData);
    }


    if (clickSubmitLogin) {
      logIn();
      setClickSubmitLogin(false);
      setFormData(initialData);
      setErrorMessage('Hidden');


    }
    else if (clickSubmitSignUp) {
      signUp();
      setClickSubmitSignUp(false);
      setFormData(initialData);
      setErrorMessage('Hidden');

    }

    //TODO - dependencies still giving warnings

  }, [clickSubmitSignUp, clickSubmitLogin, formData, initialData])

  //TODO - why doesn't history.push work inside handleSubmit?

  /*uses register request method, sets token state with response, saves token in 
  localStorage, redirects to companies once logged in via history */
  async function doSignUp(data) {
    try {
      let response = await JoblyApi.signup(data);
      window.localStorage.setItem('token', response);
      setToken(response);
      history.push("/companies");
    } catch (err) {
      setErrorMessage('');
      alert('Somthing went wrong with signup!');
      console.error(err);
    }
  }

  /*uses login request method, sets token state with response, saves token in 
 localStorage, redirects to companies once logged in via history */

  //maybe refactor - since code is almost identical?

  async function doLogin(data) {
    try {
      console.log("dologin is happening");
      let response = await JoblyApi.login(data);
      window.localStorage.setItem('token', response);
      setToken(response);
      history.push("/companies");
    }
    catch (err) {
      setErrorMessage('');
      alert("Something went wrong. with login");
      console.error(err);
    }
  }

  //upon signUp submit, changes click state to trigger useEffect

  function handleSubmitSignUp(evt) {
    evt.preventDefault();
    setClickSubmitSignUp(true);
    //checks localStorage to make sure it does what we want
    console.log("signup", localStorage);
  }

  //upon logIn submit, changes click state to trigger useEffect

  function handleSubmitLogin(evt) {
    evt.preventDefault();
    setClickSubmitLogin(true);
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

      <button onClick={handleLoginButton}>Login</button>
      <button onClick={handleRegisterButton}>Register</button>
      <form className={`"loginForm" ${hideLogin}`} onSubmit={handleSubmitLogin}>
        <label htmlFor="username">Username:</label>
        <input onChange={handleChange} value={formData.username} name="username"></input><br />
        <label htmlFor="password" >Password:</label>
        <input onChange={handleChange} value={formData.password} name="password"></input><br />
        <button type="submit">Submit</button>
        <div className={errorMessage}><Alert whichAlert="login" /></div>
      </form>

      <form className={`"signUpForm" ${hideSignup}`} onSubmit={handleSubmitSignUp}>
        <label htmlFor="first_name">First Name:</label>
        <input onChange={handleChange} value={formData.first_name} name="first_name"></input><br />
        <label htmlFor="last_name">Last Name:</label>
        <input onChange={handleChange} value={formData.last_name} name="last_name"></input><br />
        <label htmlFor="email">E-mail:</label>
        <input onChange={handleChange} value={formData.email} name="email"></input><br />
        <label htmlFor="username">Username:</label>
        <input onChange={handleChange} value={formData.username} name="username"></input><br />
        <label htmlFor="password" >Password:</label>
        <input onChange={handleChange} value={formData.password} name="password"></input><br />
        <button type="submit">Submit</button>
        <div className={errorMessage}><Alert whichAlert="register" /></div>
      </form>
    </div>
  )

}

export default LoginSignupForm;