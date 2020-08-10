import React from 'react';
import "./AppliedJobs.css";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import JobCardSimple from './JobCardSimple';


function AppliedJobs({ userJobs, unapply }) {


let jobStatus = !(userJobs) ? 
<h2 className="secondary-font">"No jobs yet - Start applying today."</h2> :
<Row className="">
      {userJobs.map(job => (
        <Col xl="4" lg="6" sm="12">
          <JobCardSimple
            jobId={job.id}
            key={job.id}
            title={job.title}
            company={job.company_handle}
            unapply={unapply} />
        </Col>
      ))}  
      </Row>




  return (
    <div className="app" >
      {jobStatus}
      
    </div>
  )
}

export default AppliedJobs;