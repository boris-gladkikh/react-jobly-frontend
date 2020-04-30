import React, { useState, useEffect, useContext } from 'react';
import JoblyApi from "./HelperApi";
// import { useHistory } from "react-router-dom";
import TokenContext from "./TokenContext";
import Alert from './Alert';


import "./login.css"

function LoginSignupForm() {
  // const history = useHistory();
  const initialData = {
    username: '',
    password: '',
    first_name: '',
    last_name: '' ,
    email: '' 
  }
  const [hideLogin, setHideLogin] = useState('Hidden');
  const [hideSignup, setHideSignup] = useState('Hidden');
  const [formData, setFormData] = useState(initialData);
  const [clickSubmitLogin, setClickSubmitLogin] = useState(false);
  const [clickSubmitSignUp, setClickSubmitSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState('Hidden');
  const {setToken} = useContext(TokenContext);

  // console.log(formData);


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


  }, [clickSubmitSignUp, clickSubmitLogin])

  //maybe refactor?
  async function doSignUp(data){
    try{
      let response = await JoblyApi.signup(data);
      window.localStorage.setItem('token', response);
      setToken(response)
    }catch (err){
      setErrorMessage('');
      alert('Somthing went wrong with signup!');
      console.error(err);
    }
  }

  async function doLogin(data) {
    try {
      console.log("dologin is happening");
      let response = await JoblyApi.login(data);
      window.localStorage.setItem('token', response);
      setToken(response);
    }
    catch (err) {
      setErrorMessage('');
      alert("Something went wrong. with login");
      console.error(err);
    }

  }

  function handleSubmitSignUp(evt) {
    evt.preventDefault();
    setClickSubmitSignUp(true);
    console.log("signup", localStorage);
    // history.push('/companies');
  }

  function handleSubmitLogin(evt) {
    evt.preventDefault();
    setClickSubmitLogin(true);
    console.log("login", clickSubmitLogin, localStorage);
    // history.push('/companies');
  }

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
        <div className={errorMessage}><Alert whichAlert="login"/></div>
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
        <div className={errorMessage}><Alert whichAlert="register"/></div>
      </form>
    </div>
  )

}

export default LoginSignupForm;