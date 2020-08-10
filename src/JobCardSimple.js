import React from 'react';
import Card from 'react-bootstrap/Card';

//simple jobcard for profile page to display applied jobs

function JobCardSimple({ title, company }) {
  return (
    <div className="mb-2">
      <Card >
        <Card.Header>
          <h5 className="primary-font">{title}</h5>
        </Card.Header>
        <Card.Body>
          <p className="secondary-font">{company}</p>
        </Card.Body>

      </Card>

    </div>
  )

}

export default JobCardSimple