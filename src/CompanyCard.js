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
        <div>
          <img className="companyLogo" src={"https://fintechng.org/portal/assets/img/logo-default.svg"} alt="company logo" />
        </div>
        <div className="companycardtext">
          <h4>{name}</h4>
          <p>{description}</p>
        </div>
      </div>

    </Link>
  );
}

export default CompanyCard;