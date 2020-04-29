import React, { useState, useEffect } from 'react';
import JoblyApi from "./HelperApi";
import SearchBar from "./SearchBar";
import CompanyCard from "./CompanyCard";
import { Link } from "react-router-dom";

function CompanyList({endpoint, setEndpoint}) {
  const [companies, setCompanies] = useState([]);
 
//sets our endpoint to send to searchBar via props, to determine which endpoint our API helper searches
setEndpoint("companies");


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

//runs on search bar if search bar is used, passed to search bar component in props
  function companyListSearch(filteredCompanies){
    setCompanies(filteredCompanies); 
  }

  if (!Array.isArray(companies)) {
    return (
      <div>
        Loading...
      </div>
    )
  } else {

    return (
      <div>
        <SearchBar endpoint={endpoint} searchCompanies={companyListSearch}/>
        <div>
          {companies.map(({ name, logo_url, description, handle }) =>
            <Link className="CompanyList-Link" to={`/companies/${handle}`}>
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
}

export default CompanyList



//search bar on top 

//list of companies (get all companies api)

//map to get company card for each company

//- company card  props = company
