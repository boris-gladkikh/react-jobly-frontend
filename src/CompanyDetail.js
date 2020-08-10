import React, { useEffect, useState } from 'react';
import JoblyApi from "./HelperApi";
import { useParams } from "react-router-dom";
import JobCard from './JobCard';
import LoadingSpinner from './LoadingSpinner';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import companyLogo from './img/company-rectangle.png';


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


  if (isLoading) {
    return <LoadingSpinner />
  }
  return (
    <div>
        <Row>
          <Col className="bg-white" lg="4" md="12">
            <h1 className="primary-font mt-5">{company.name}</h1>
            <img className="company-logo mt-5" src={companyLogo} alt="company logo" />
            <h5 className="secondary-font mt-5">{company.description}</h5>
          </Col>
          <Col style={{minHeight:"100vh"}} lg="8" md="12">
            <div className="mx-3">
            <h4 className="text-white secondary-font mt-5" >Click on the apply button to automatically apply.</h4>
            </div>
            <div className="mt-5">
            <Row className="">
                {company.jobs.map(job => (
                  <Col xl="4" lg="6" sm="12">
                    <JobCard
                      jobList={currentUser.jobs}
                      jobId={job.id}
                      key={job.id}
                      title={job.title}
                      salary={job.salary}
                      equity={job.equity}
                      username={currentUser.username} />
                  </Col>
                ))}
              </Row>
            </div>
          </Col>
        </Row>
    </div>
  );

}

export default CompanyDetail