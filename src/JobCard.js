import React from 'react';

function JobCard({title, salary, equity}){
  return(
    <div>
      <h2>Title:{title}</h2>
  <h4>Salary:{salary}</h4>
  <h4>Equity:{equity}</h4>
    </div>
  );

}

export default JobCard