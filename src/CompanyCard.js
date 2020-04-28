import React from 'react';

function CompanyCard({name, description, logo_url}){
  return(
    <div>
      <h1>{name}</h1>
      <p>{description}</p>
      <img src={logo_url} alt="company logo"/>
    </div>
  );
}

export default CompanyCard;