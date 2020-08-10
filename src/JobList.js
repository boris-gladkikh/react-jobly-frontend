import React, { useEffect, useState } from 'react';
import JoblyApi from "./HelperApi";
import SearchBar from "./SearchBar";
import JobCard from "./JobCard";
import "./JobList.css";
import LoadingSpinner from './LoadingSpinner';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

/**JobList: Component that renders list of JobCards */
function JobList({ currentUser }) {
  const [jobs, setJobs] = useState();
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
    if(!jobs){
      getJobs();
    }
  }, [setJobs]);

  //runs on search bar if search bar is used, passed to search bar component in props
  function jobListSearch(filteredJobs) {
    setJobs(filteredJobs);
  }

  //if jobs is a promise return loading
  // else if it resolves to an array as expected render list of JobCards
  if (isLoading) {
    return <LoadingSpinner />
  } else {

    return (
      <div className="mx-3 app">
        <div className="mt-5 px-2">
          <h1 className="primary-font">These jobs are available.</h1>
          <h4 className="text-white secondary-font">Easily apply to any position with a single click.</h4>
          <p className="primary-font">You can find a list of all jobs applied to on your profile page.</p>
        </div>
        {/* <SearchBar whichSearch='jobs' searchJobs={jobListSearch} /> */}
        <Container className="mt-5">
          <Row>
          {jobs.map(({ title, salary, equity, id, company_handle }) =>
           <Col sm="12" md="6" lg="3">
           <JobCard
              jobList={currentUser.jobs}
              key={id}
              jobId={id}
              title={title}
              salary={salary}
              equity={equity}
              company={company_handle}
              username={currentUser.username}
            /></Col> )}
          </Row>
        </Container>
      </div>
    );
  }
}


export default JobList;