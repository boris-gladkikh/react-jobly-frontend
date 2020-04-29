import React, {useEffect, useState} from 'react';
import JoblyApi from "./HelperApi";
import { useParams } from "react-router-dom";
import JobCard from './JobCard';

function CompanyDetail(){
  const[company, setCompany] = useState({});
  let { name } = useParams();

  useEffect(() => {
    console.log('use effect working');
    async function getCompany() {
      try {
        let resp = await JoblyApi.getCompany(name);
        setCompany(resp);
      } catch (err) {
        console.error(err);
      }
    }
    getCompany();
  }, [setCompany, name]);

  //todo - getting error regarding unique key for child, although
  //job.id IS a unique key within company jobs.

  if(Array.isArray(company.jobs)){
    return(
      <div>
        <h3>{company.name}</h3>
        <p>{company.description}</p>
        <div>{company.jobs.map(job => (
          <div>
            <JobCard
            key={job.id}
            title={job.title}
            salary={job.salary}
            equity={job.equity}/>
          </div>
        ))}</div>
      </div>
    )
  }else{
    return(<div>"Loading..."</div>);
  }
}

export default CompanyDetail