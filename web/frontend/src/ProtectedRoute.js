import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('access_token');
  
  return (
    <Route 
      {...rest} 
      element={props => 
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      } 
    />
  );
};

export default ProtectedRoute;
