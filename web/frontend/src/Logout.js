// Logout.js
import React from 'react';
import axios from 'axios';

const Logout = () => {
  const handleLogout = () => {
    axios.post('/rest-auth/logout/')
      .then(response => console.log(response))
      .catch(error => console.error(error));
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;