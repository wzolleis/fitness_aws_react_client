import React from 'react';
import {Route, Switch} from 'react-router-dom';

//import Home from './containers/Home';
// import NotFound from "./containers/NotFound";
// import Login from "./containers/Login";
// import Signup from "./containers/Signup";
// import NewExercise from "./components/NewExercise";
// import Exercises from "./containers/Exercises";
import asyncComponent from './components/AsyncComponent';
import AppliedRoute from "./components/AppliedRoute";
import AuthenticatedRoute from './components/AuthenticatedRoute';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';


const AsyncHome = asyncComponent(() => import('./containers/Home'));
const AsyncLogin = asyncComponent(() => import('./containers/Login'));
const AsyncExercises = asyncComponent(() => import('./containers/Exercises'));
const AsyncSignup = asyncComponent(() => import('./containers/Signup'));
const AsyncNewExercise = asyncComponent(() => import('./containers/NewExercise'));
const AsyncNotFound = asyncComponent(() => import('./containers/NotFound'));

export default ({childProps}) => (
    <Switch>
        <AppliedRoute path="/" exact component={AsyncHome} props={childProps}/>
        <UnauthenticatedRoute path="/login" exact component={AsyncLogin} props={childProps}/>
        <UnauthenticatedRoute path="/signup" exact component={AsyncSignup} props={childProps}/>
        <AuthenticatedRoute path="/exercises/new" exact component={AsyncNewExercise} props={childProps}/>
        <AuthenticatedRoute path="/exercises/:id" exact component={AsyncExercises} props={childProps}/>
        <Route component={AsyncNotFound}/>
    </Switch>
);