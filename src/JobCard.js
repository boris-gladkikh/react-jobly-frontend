import React, { useState } from 'react';
import "./jobcard.css";
// import { Link } from "react-router-dom";

/**JobCard: Child component to JobList
 * renders job information
 */
function JobCard({ title, salary, equity, company }) {
  const [Applied, setApplied] = useState(false);


  function handleApply(evt) {
    evt.preventDefault();
    setApplied(!Applied);
  }



  return (
    // <Link className="JobList-Link" to={`/jobs/`}>
    <div className="jobcard">
      <h3>{title}</h3>
      {company}
      <p>
        <b>Salary: </b>{salary}<br />
        <b>Equity: </b>{equity}<br />
      </p>
      {(Applied === false) ?
        <button onClick={handleApply}>Apply Now</button> :
        <button onClick={handleApply}>Applied</button>
      }
    </div>
    // </Link>
  );

}

export default JobCard