import React from 'react';
import { Link } from "react-router-dom";
import "./CompanyCard.css"

/**CompanyCard: Child component to CompanyList
 * renders information about company
 */

function CompanyCard({ name, description, logoUrl, handle }) {
  return (
    <Link className="CompanyList-Link" to={`/companies/${handle}`}>
      <div className="companycard">
        <h4>{name}</h4>
        <p>{description}</p>
        <img className="companyLogo"src={logoUrl} alt="company logo" />
      </div>
    </Link>
  );
}

export default CompanyCard;