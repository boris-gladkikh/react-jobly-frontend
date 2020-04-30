import React, {useState} from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import Homepage from "./Homepage";
import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyDetail";
import JobList from "./JobList";
import LoginSignupForm from "./LoginSignupForm";
import ProfileForm from "./ProfileForm";
import NavBar from "./NavBar";
import TokenContext from "./TokenContext";



//Routes handling our navigation to components
//Switch handles our routes, Nav bar shows up on each page
function Routes() {
  const [token, setToken] = useState("");

//pass states as provider, use context when login form updates
  return (
    <>
    <TokenContext.Provider value={{token, setToken}}>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/companies">
          <CompanyList />
        </Route>
        <Route  path="/companies/:name">
          <CompanyDetail />
        </Route>
        <Route exact path="/jobs">
          <JobList />
        </Route>
        <Route exact path="/login">
          <LoginSignupForm  />
        </Route>
        <Route exact path="/profile">
          <ProfileForm />
        </Route>
        <Redirect to="/" />
      </Switch>
      </TokenContext.Provider>
    </>
  );

}

export default Routes