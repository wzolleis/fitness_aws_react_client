import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Home from './containers/Home';
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import AppliedRoute from "./components/AppliedRoute";
import Signup from "./containers/Signup";
import NewExercise from "./components/NewExercise";
import Exercises from "./containers/Exercises";
import AuthenticatedRoute from './components/AuthenticatedRoute';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';

export default ({childProps}) => (
    <Switch>
        <AppliedRoute path="/" exact component={Home} props={childProps}/>
            <UnauthenticatedRoute path="/login" exact component={Login} props={childProps}/>
            <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps}/>
            <AuthenticatedRoute path="/exercises/new" exact component={NewExercise} props={childProps}/>
            <AuthenticatedRoute path="/exercises/:id" exact component={Exercises} props={childProps}/>
        <Route component={NotFound}/>
    </Switch>
);