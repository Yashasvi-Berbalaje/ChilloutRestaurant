import React from 'react';
import {Route,Redirect} from 'react-router-dom'
import {AuthenticateVerififcation} from './authentication';

function ProtectedVerification({ component:Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props=>
            AuthenticateVerififcation() ? (
            <Component {...props}/>
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }

  export default ProtectedVerification;