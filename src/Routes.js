import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Loadable from 'react-loadable';
import asyncComponent from './components/AsyncComponent';
import AppliedRoute from "./components/AppliedRoute";
import AuthenticatedRoute from './components/AuthenticatedRoute';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';
import LoadingComponent from './components/LoadingComponent'


const AsyncLogin = asyncComponent(() => import('./containers/Login'));
const AsyncExercises = asyncComponent(() => import('./containers/ExercisesForm'));
const AsyncSignup = asyncComponent(() => import('./containers/Signup'));
const AsyncNewExercise = asyncComponent(() => import('./containers/NewExercise'));
const AsyncNotFound = asyncComponent(() => import('./containers/NotFound'));

const AsyncHome = Loadable({
    loader: () => import('./containers/Home'),
    loading: LoadingComponent
});

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