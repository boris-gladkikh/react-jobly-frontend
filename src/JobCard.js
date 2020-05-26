import React, { useState } from 'react';
import "./jobcard.css";
import JoblyApi from './HelperApi';
// import { Link } from "react-router-dom";

/**JobCard: Child component to JobList
 * renders job information
 */
function JobCard({ jobId, title, salary, equity, company, username, jobList }) {
  const [Applied, setApplied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //TODO: Figure out if you should use useEffect?
  //do you need to do usecallback, or another state?
  //apply to job via backend server - NEED TO FIGURE OUT WHERE TO MOVE THIS:
  //

  async function applyForJob() {
    let data = {
      state: "Applied",
      username
    }
    try {
      let response = await JoblyApi.applyForJob(jobId, data);
      console.log("this is response from applying for a job", response);
      setApplied(true);
    }
    catch (err) {
      console.error(err);
    }

  }


  function handleApply(evt) {
    evt.preventDefault();
    setIsLoading(true);
    applyForJob();
  }



let jobIdArray = jobList.map(j => j.id);




  //add to check if you already applied to this job prior by looking at currentUser jobs (pass thru props)
  let applyButtonConditional = (jobIdArray.includes(jobId) || Applied === true) ?
    <button className="appliedButton">Applied</button> :
    <button onClick={handleApply}>Apply Now</button> 





  return (
    // <Link className="JobList-Link" to={`/jobs/`}>
    <div className="jobcard">
      <div >
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
        {applyButtonConditional}

      </div>


    </div>
    // </Link>
  );


}

export default JobCard