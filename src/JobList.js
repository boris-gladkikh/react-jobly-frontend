import React, { useEffect, useState } from 'react';
import JoblyApi from "./HelperApi";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import JobCard from "./JobCard";

function JobList({endpoint, setEndpoint}) {
  const [jobs, setJobs] = useState([]);

  setEndpoint("jobs")

  useEffect(() => {
    async function getJobs() {
      try {
        let resp = await JoblyApi.getAllJobs()
        setJobs(resp);
      } catch (err) {
        console.error(err);
      }
    }
    getJobs();
  }, [setJobs]);

  //runs on search bar if search bar is used, passed to search bar component in props
  function jobListSearch(filteredJobs){
    setJobs(filteredJobs); 
  }

if (!Array.isArray(jobs)) {
  return (
    <div>
      Loading...
    </div>
  )
}else {

  return (
    <div>
      <SearchBar searchJobs={jobListSearch}/>
      <div>
        {jobs.map(({ title, salary, equity, id}) =>
          <Link className="JobList-Link" to={`/jobs/`}>
            <JobCard
              key= {id}
              title={title}
              salary={salary}
              equity={equity}
            /> 
          </Link>)}
        </div>

    </div>
  )

}
}


export default JobList