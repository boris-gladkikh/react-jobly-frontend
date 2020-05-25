import React, { useEffect, useState } from 'react';
import JoblyApi from "./HelperApi";
import SearchBar from "./SearchBar";
import JobCard from "./JobCard";

/**JobList: Component that renders list of JobCards */
function JobList({currentUser}) {
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
      }finally {
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
        Loading...
      </div>
    )
  } else if(!currentUser.username) {
    return(
      <h1>UNAUTHORIZED!</h1>
    )
  }else{
    console.log(jobs)

    return (
      <div>
         <h1>These jobs are available!</h1>
         <img className="companyPhoto" src="https://images.pexels.com/photos/373912/pexels-photo-373912.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"></img>
        <h3>Click on the apply button to automatically apply.</h3>
        <p> You can find a list of all jobs applied to on your profile page.</p>
        <SearchBar whichSearch='jobs' searchJobs={jobListSearch} />
        <div>
          {jobs.map(({ title, salary, equity, id, company_handle }) =>
            <JobCard
              key={id}
              title={title}
              salary={salary}
              equity={equity}
              company={company_handle}
            />)}
        </div>

      </div>
    );
  }
}


export default JobList;