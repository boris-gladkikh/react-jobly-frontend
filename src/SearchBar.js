import React, {useState, useEffect} from 'react';
import JoblyApi from "./HelperApi";




function SearchBar({searchCompanies, endpoint, searchJobs}){
  const [formData, setFormData] = useState()
  const [searchClick, setSearchClick] = useState(false);
  


  function handleChange(evt){
    let {name, value} = evt.target
    setFormData(data =>({
      ...data,
      [name]:value
    }))
  }

  
  function handleSubmit(evt){
    evt.preventDefault();
    setSearchClick(!searchClick);
    
  }

  //once our search is submitted, useEffect uses our API filteredResults method then passes 
  //reponse to our search function, which then 

  useEffect(()=>{
    async function filterBySearch(){
      let response = await JoblyApi.getFilteredResults(formData,endpoint);
      if(endpoint=== "companies"){
        searchCompanies(response);
      } else {
        searchJobs(response)
      }
    }
    filterBySearch();
},[searchClick, endpoint,formData, searchCompanies, searchJobs]);



  //determines what we are searching 
  //if ___ is company,  use API helper for get company
  //if ___ is job use API helper for getting job


  return(
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">Search:</label>
        <input onChange={handleChange} name="search" type="text"/>
        <button type="submit">Go</button>
      </form>
    
    </div>
  )

}

export default SearchBar