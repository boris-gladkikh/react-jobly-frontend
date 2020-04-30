import React from 'react';

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