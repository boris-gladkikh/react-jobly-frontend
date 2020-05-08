import React from 'react';
import "./jobcard.css";
// import { Link } from "react-router-dom";

/**JobCard: Child component to JobList
 * renders job information
 */
function JobCard({ title, salary, equity }) {
  return (
    // <Link className="JobList-Link" to={`/jobs/`}>
      <div className="jobcard">
        <h2>Title:{title}</h2>
        <h4>Salary:{salary}</h4>
        <h4>Equity:{equity}</h4>
      </div>
    // </Link>
  );

}

export default JobCard