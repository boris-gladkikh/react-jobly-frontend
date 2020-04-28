import React from 'react';
import JoblyApi from "./HelperApi";
import SearchBar from "./SearchBar";
import CompanyCard from "./CompanyCard";

function CompanyList(){
  async function getCompanies(){
    return await JoblyApi.getAllCompanies()
  }

  const companies = getCompanies();

  return(
    <div>
      <SearchBar />
      <div>
        {companies.map(({name,description}) => <CompanyCard name={name} description={description}/>)}
      </div>

    </div>
  )

}

export default CompanyList



//search bar on top 

//list of companies (get all companies api)

//map to get company card for each company

//- company card  props = company
