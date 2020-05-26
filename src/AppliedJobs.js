import React from 'react';
import "./AppliedJobs.css";
function AppliedJobs({ userJobs }) {

  let jobsApplied =
    userJobs.map(job => <p>{job.title} <button className="smallDeleteButton" >X</button></p>)


  return (
    <div >
      <h1> Jobs Applied</h1>
      {jobsApplied.length === 0 ? "No Jobs yet" : jobsApplied}

    </div>
  )
}

export default AppliedJobs;