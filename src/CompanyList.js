import React, { useEffect } from 'react';
import JoblyApi from "./HelperApi";
import SearchBar from "./SearchBar";
import CompanyCard from "./CompanyCard";
import { Link } from "react-router-dom";

function CompanyList({setCompanies, companies}) {

  useEffect(() => {
    async function getCompanies() {
      try {
        let resp = await JoblyApi.getAllCompanies()
        setCompanies(resp);
      } catch (err) {
        console.error(err);
      }
    }
    getCompanies();
  }, [setCompanies]);

  return (
    <div>
      <SearchBar />
      <div>
        {companies.map(({ name, logo_url, description, handle }) =>
          <Link className="CompanyList-Link" to={`companies/${name}`}>
            <CompanyCard
              key={handle}
              name={name}
              logo_url={logo_url}
              description={description} 
            /> 
          </Link>)}
        </div>

    </div>
  )

}

export default CompanyList



//search bar on top 

//list of companies (get all companies api)

//map to get company card for each company

//- company card  props = company
