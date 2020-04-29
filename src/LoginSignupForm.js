import React, {useState} from 'react';

function LoginSignupForm(){

  const [hideLogin, setHideLogin] = useState('');
  const [hideSignup, setHideSignup] = useState('hidden');
  const [formData, setFormData] = useState({});

  


  return(
    <div>
      <h1>Login</h1>
    </div>
  )

}

export default LoginSignupForm;