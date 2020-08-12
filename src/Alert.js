import React from 'react';

//prints appropriate alert based on whichalert prop
//uses object dictionary to find appropriate alert

//TODO: assign actual error as prop so alerts are more
//verbose, less vague

function Alert({ errors }) {

  console.log("this is type of errors in alert \n\n\n", errors)
  return (
    <div>

      {errors.map((err, i) => (
        <div key={i}><h4 className="text-dark primary-font">{err}</h4></div>
      ))}
    </div>
  )
}


export default Alert