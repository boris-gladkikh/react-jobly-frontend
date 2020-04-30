import React from 'react';

//prints appropriate alert based on whichalert prop
//uses object dictionary to find appropriate alert

//TODO: assign actual error as prop so alerts are more
//verbose, less vague

function Alert({whichAlert}){
  const errors = {
    login: 'Invalid Credentials!',
    register: 'Invalid Registration!'
  }
  return (
    <div>{errors[whichAlert]}!</div>
  );
}

export default Alert;