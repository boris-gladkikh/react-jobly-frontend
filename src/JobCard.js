import React, { useState } from 'react';
import "./jobcard.css";
import JoblyApi from './HelperApi';
// import { Link } from "react-router-dom";

/**JobCard: Child component to JobList
 * renders job information
 */
function JobCard({ key, title, salary, equity, company, username }) {
  const [Applied, setApplied] = useState(false);

  //apply to job via backend server - NEED TO FIGURE OUT WHERE TO MOVE THIS:

  async function applyForJob() {
    let data = {
      state: "apply",
      username
    }
    //"key" is the jobId passed down  as prop 
    try{
      let response = await JoblyApi.applyForJob(key, data);
      console.log("this is response from applying for a job", response)

    }
    catch(err){
      console.error(err);
      
    }

  }


  function handleApply(evt) {
    evt.preventDefault();
    setApplied(!Applied);
  }

  function handleUnapply(evt) {
    evt.preventDefault();
    setApplied(!Applied);
  }



  return (
    // <Link className="JobList-Link" to={`/jobs/`}>
    <div className="jobcard">
      <div >
        {/* <img className="jobLogo" src={"https://fintechng.org/portal/assets/img/logo-default.svg"} alt="placeholder logo" /> */}
        <img className="jobLogo" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQH_7OLqOFIPt56IigyUUem3B4als0iVFAp1qk4yWXrAuC3BDTi&usqp=CAU"} alt="placeholder logo" />

      </div>
      <div className="jobCardText">
        <h4>{title}</h4>
        {company}
        <p>
          <b>Salary: </b>{salary}<br />
          <b>Equity: </b>{equity}<br />
        </p>
      </div>
      <div className="jobCardButton">
        {(Applied === false) ?
          <button onClick={handleApply}>Apply Now</button> :
          <button onClick={handleApply}>Applied</button>
        }
      </div>


    </div>
    // </Link>
  );

}

export default JobCard