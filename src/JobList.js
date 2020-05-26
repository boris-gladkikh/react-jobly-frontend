import React, { useEffect, useState } from 'react';
import JoblyApi from "./HelperApi";
import SearchBar from "./SearchBar";
import JobCard from "./JobCard";
import "./JobList.css";

/**JobList: Component that renders list of JobCards */
function JobList({ currentUser }) {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Inital request to get all jobs
  useEffect(() => {
    async function getJobs() {
      try {
        let resp = await JoblyApi.getAllJobs()
        setJobs(resp);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    getJobs();
  }, [setJobs]);

  //runs on search bar if search bar is used, passed to search bar component in props
  function jobListSearch(filteredJobs) {
    setJobs(filteredJobs);
  }

  //if jobs is a promise return loading
  // else if it resolves to an array as expected render list of JobCards
  if (isLoading) {
    return (
      <div>
        <h1>
          Loading...
       </h1>
      </div>
    )

  } else {

    return (
      <div>
        <h1>These jobs are available!</h1>
        <h3>Click on the apply button to automatically apply.</h3>
        <p> You can find a list of all jobs applied to on your profile page.</p>
        <SearchBar whichSearch='jobs' searchJobs={jobListSearch} />
        <div>
          {jobs.map(({ title, salary, equity, id, company_handle }) =>
            <JobCard
              jobList={currentUser.jobs}
              key={id}
              jobId={id}
              title={title}
              salary={salary}
              equity={equity}
              company={company_handle}
              username={currentUser.username}
            />)}
        </div>

      </div>
    );
  }
}


export default JobList;