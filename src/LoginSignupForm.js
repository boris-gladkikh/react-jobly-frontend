import React, { useState, useEffect, useContext } from 'react';
import JoblyApi from "./HelperApi";
import { useHistory } from "react-router-dom";
import TokenContext from "./TokenContext";


import "./login.css"

function LoginSignupForm() {
  const history = useHistory();
  const [hideLogin, setHideLogin] = useState('Hidden');
  const [hideSignup, setHideSignup] = useState('Hidden');
  const [formData, setFormData] = useState({});
  const [clickSubmit, setClickSubmit] = useState(false);
  const {setToken} = useContext(TokenContext);


  useEffect(() => {
    async function logIn() {

      await doLogin(formData);
    }
    if (clickSubmit) {
      logIn();
    }


  }, [clickSubmit, formData])

  async function doLogin(data) {
    try {
      console.log("dologin is happening");
      let response = await JoblyApi.login(data);
      window.localStorage.setItem('token', response);
      setToken(response)
    }
    catch (err) {
      alert("Something went wrong. It's your fault")
      console.error(err)
    }

  }

  function handleSubmit(evt) {
    evt.preventDefault();
    setClickSubmit(true);
    // console.log("submit", clickSubmit, localStorage);
    // setClickSubmit(false);
 
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
      <form className={`"loginForm" ${hideLogin}`} onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input onChange={handleChange} name="username"></input><br />
        <label htmlFor="password" >Password:</label>
        <input onChange={handleChange} name="password"></input><br />
        <button type="submit">Submit</button>
      </form>
      <form className={`"signUpForm" ${hideSignup}`} onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name:</label>
        <input onChange={handleChange} name="firstName"></input><br />
        <label htmlFor="lastName">Last Name:</label>
        <input onChange={handleChange} name="lastName"></input><br />
        <label htmlFor="email">E-mail:</label>
        <input onChange={handleChange} name="email"></input><br />
        <label htmlFor="username">Username:</label>
        <input onChange={handleChange} name="username"></input><br />
        <label htmlFor="password" >Password:</label>
        <input onChange={handleChange} name="password"></input><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  )

}

export default LoginSignupForm;