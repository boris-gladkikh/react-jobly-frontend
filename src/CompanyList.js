import React, { useState, useEffect } from 'react';
import JoblyApi from "./HelperApi";
import SearchBar from "./SearchBar";
import CompanyCard from "./CompanyCard";
import "./CompanyList.css";
import LoadingSpinner from './LoadingSpinner';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


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
    return <LoadingSpinner />
  }
  return (
    <div className="mx-3 app">
      <div className="mt-5 px-2">
        <h1 className="primary-font">These companies are hiring.</h1>
        <h4 className="text-white secondary-font">See the most in-demand jobs at the hottest companies.</h4>
        <p className=" secondary-font">Click on a company to see available jobs.</p>
        <SearchBar whichSearch='companies' searchCompanies={companyListSearch} />
      </div>
      <Container className="mt-5">
        <Row>
          {companies.map(({ name, logo_url, description, handle }) =>
            <Col key={name} sm="12" md="6" lg="4" xl="3">
              <CompanyCard
                key={handle}
                handle={handle}
                name={name}
                logoUrl={logo_url}
                description={description}
              /></Col>)}
        </Row>
      </Container>


    </div>
  )
}

export default CompanyList


