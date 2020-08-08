import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

function LoadingSpinner(){
  return (
    <div className="app mt-5">
      <Spinner animation="border" size="xl" className="mt-5" />
    </div>
  )
}

export default LoadingSpinner