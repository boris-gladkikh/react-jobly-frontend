import React, {useState} from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import Homepage from "./Homepage";
import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyDetail";
import JobList from "./JobList";
import LoginSignupForm from "./LoginSignupForm";
import ProfileForm from "./ProfileForm";
import NavBar from "./NavBar";


//Routes handling our navigation to components
//Switch handles our routes, Nav bar shows up on each page
function Routes() {
  const [companies, setCompanies] = useState([]);

  // function companyFilter(name){
  //   let companyArray = companies.filter(company => company.name === name);
  //   return companyArray[0];
  // }

  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/companies">
          <CompanyList companies={companies} setCompanies={setCompanies}/>
        </Route>
        <Route  path="/companies/:name">
          <CompanyDetail />
        </Route>
        <Route exact path="/jobs">
          <JobList />
        </Route>
        <Route exact path="/login">
          <LoginSignupForm />
        </Route>
        <Route exact path="/profile">
          <ProfileForm />
        </Route>
        <Redirect to="/" />
      </Switch>
    </>
  );

}

export default Routes