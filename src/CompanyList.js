import React, { useState, useEffect } from 'react';
import JoblyApi from "./HelperApi";
import SearchBar from "./SearchBar";
import CompanyCard from "./CompanyCard";
import "./CompanyList.css";

/**CompanyList: Component that renders list of CompanyCards */
function CompanyList({ currentUser }) {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Inital request to get all companies
  useEffect(() => {
    async function getCompanies() {
      try {
        let resp = await JoblyApi.getAllCompanies();
        setCompanies(resp);
      } catch (err) {
        console.error('server failed', err);
      } finally {
        setIsLoading(false);
      }
    }
    getCompanies();

  }, [setCompanies]);


  //runs on search bar if search bar is used, passed to search bar component in props
  function companyListSearch(filteredCompanies) {
    setCompanies(filteredCompanies);
  }

  //change to state
  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    );
  } else {
    return (
      <div>
        <h1>These companies are hiring!</h1>
        {/* <img className="companyListPhoto" alt="stock company img" src="https://images.pexels.com/photos/3182759/pexels-photo-3182759.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"></img> */}
        <p>
          Our company list is growing every day. See the most in-demand
          jobs at the hottest companies!
        </p>
        {/* <h3>Click on a company to see a job list.</h3> */}
        <SearchBar whichSearch='companies' searchCompanies={companyListSearch} />
        <div className="companycontainer">
          {companies.map(({ name, logo_url, description, handle }) =>
            <CompanyCard
              key={handle}
              handle={handle}
              name={name}
              logoUrl={logo_url}
              description={description}
            />)}
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
