import React, { useState, useEffect, useCallback } from 'react';
import JoblyApi from "./HelperApi";
import "./SearchBar.css";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';




/**SearchBar: Component that is used to filter a list */
function SearchBar({ searchCompanies, searchJobs, whichSearch }) {
  //TODO add string
  const [formData, setFormData] = useState();
  const [searchClick, setSearchClick] = useState(false);


  // handleChange: sets formData state to form values
  function handleChange(evt) {
    let { name, value } = evt.target
    //TODO change to string
    setFormData({[name]: value});
  }

  // handleSubmit: changes our useEffect state to true ot false
  function handleSubmit(evt) {
    evt.preventDefault();
    setSearchClick(!searchClick);

  }

  //once our search is submitted, useEffect uses our API filteredCompanies
  // or filteredJobs method then passes 
  //reponse to our search function to change state in company list or job list
  //to filter lists shown

  const filterSearch = useCallback(
    async (formData) => {
      try {
        if (whichSearch === 'companies') {
          let response = await JoblyApi.getFilteredCompanies(formData);
          searchCompanies(response);

        } else {
          let response = await JoblyApi.getFilteredJobs(formData);
          searchJobs(response);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setSearchClick(false);
      }
    
    },[searchCompanies, searchJobs, whichSearch]);

  useEffect(() => {
    if(searchClick){
      filterSearch(formData);
    }

  }, [searchClick, filterSearch, formData]);

  return (
    <div className=" mb-2">
      <Form inline className="justify-content-center"  onSubmit={handleSubmit}>
        <Form.Group>

        <Form.Label htmlFor="search"></Form.Label>
        <Form.Control  className="" onChange={handleChange} name="search" placeholder={`Search ${whichSearch}`} type="text" />
        <Button variant="dark" className="" type="submit">Go</Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default SearchBar