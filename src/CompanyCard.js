import React from 'react';
import { Link } from "react-router-dom";
import "./CompanyCard.css"
import companyLogo from './img/company-rectangle.png';

/**CompanyCard: Child component to CompanyList
 * renders information about company
 */

function CompanyCard({ name, description, logoUrl, handle }) {
  return (
    <Link className="" to={`/companies/${handle}`}>
      <div className="company-card">
        <div className="">
          <img className="company-logo" src={companyLogo} alt="company logo" />
        </div>       
        <div className="card-text">
          <h5 className="nav-font">{name}</h5>
          <p className="nav-font">{description}</p>
        </div>
      </div>

    </Link>
  );
}

export default CompanyCard;