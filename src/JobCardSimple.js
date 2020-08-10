import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'

//simple jobcard for profile page to display applied jobs

function JobCardSimple({ title, company, unapply }) {
  return (
    <div className="mb-2">
      <Card >
        <Card.Header>
          <h5 className="primary-font">{title}</h5>
        </Card.Header>
        <Card.Body>
          <p className="secondary-font">{company}</p>
          <Button size="sm" variant="success" onClick={unapply}>unapply</Button>
        </Card.Body>

      </Card>

    </div>
  )

}

export default JobCardSimple