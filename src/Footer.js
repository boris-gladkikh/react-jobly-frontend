import React from 'react';
import Navbar from 'react-bootstrap/Navbar';


function Footer(){
  return(
    <Navbar bg="dark" sticky="bottom" className="text-white text-center flex-column">
      <h6> &copy;Boris Gladkikh 2020</h6>

    </Navbar>
  )
}

export default Footer;