import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
  import Login from './login';
  import Home from '../MainWrapper';
  import Verification from '../Component/verification';
  import ResetPassword from '../Component/resetPassword';
  import ProtectedRoute  from './ProtectedRoute';
  import ProtectedVerification from './protectedVerififcation';
  import Hostel from '../Component/hostel';

export default function routes() {
    return (
        <Router>
            <Switch>
                <Route path='/login' component={Login}></Route>
                <Route path='/resetPassword' component={ResetPassword}></Route>
                <ProtectedRoute path='/home' component={Home}></ProtectedRoute>
                <ProtectedVerification path='/verification' component={Verification}></ProtectedVerification>
                {/*<Route path='/hostel' component={Hostel}></Route>*/}

            </Switch>
        </Router>
    )
}
