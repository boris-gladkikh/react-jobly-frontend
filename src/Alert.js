import React from 'react';

//prints appropriate alert based on whichalert prop
//uses object dictionary to find appropriate alert

//TODO: assign actual error as prop so alerts are more
//verbose, less vague

function Alert({errors}){

  return (

    Array.from(errors).map((err,i) => (
      <div key={i}><h4 className="text-dark primary-font">{err.message}</h4></div>
    ))
   
  );
}

export default Alert;