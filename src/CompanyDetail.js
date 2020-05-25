import React, { useEffect, useState } from 'react';
import JoblyApi from "./HelperApi";
import { useParams } from "react-router-dom";
import JobCard from './JobCard';

function CompanyDetail({ currentUser }) {
  const [company, setCompany] = useState({});
  let { name } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  // make api call to get a company
  // handle error if call went wrong
  // set isLoading state back to false 
  useEffect(() => {
    async function getCompany() {
      try {
        let resp = await JoblyApi.getCompany(name);
        setCompany(resp);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    getCompany();
  }, [setCompany, name]);


  // If isLoading state is false render jobcard, otherwise show loading...
  if (isLoading) {

    return (<div>"Loading..."</div>);

  } else if (!currentUser.username) {
    return (
      <h1>UNAUTHORIZED!</h1>
    );
  } else {
    return (
      <div>
        <h1><u>{company.name}</u></h1>
        <p><b>Description: </b>{company.description}</p>
        <h4 >Click on the apply button to automatically apply.</h4>
        <div>{company.jobs.map(job => (
          <div>
            <JobCard
              jobId={job.id}
              key={job.id}
              title={job.title}
              salary={job.salary}
              equity={job.equity}
              username={currentUser.username} />
          </div>
        ))}</div>
      </div>
    );
  }
}

export default CompanyDetail