import React from "react";
import {Route, Switch} from "react-router-dom";
import AppliedRoute from "./components/AppliedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

import Home from "./containers/Home";
import Login from "./containers/Login";
import Exercises from "./containers/ExerciseItemForm";
import Signup from "./containers/Signup";
import NewExercise from "./containers/NewExercise";
import PlanList from "./containers/PlanList";
import NotFound from "./containers/NotFound";

export default ({childProps}) =>
    <Switch>
            <AppliedRoute path="/" exact component={Home} props={childProps}/>

            <UnauthenticatedRoute path="/login" exact component={Login} props={childProps}/>
            <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps}/>
            <AuthenticatedRoute path="/exercises/new" exact component={NewExercise} props={childProps}/>
        <AuthenticatedRoute path="/plans" exact component={PlanList} props={childProps}/>
            <AuthenticatedRoute path="/exercises/:id" exact component={Exercises} props={childProps}/>
        {/* Finally, catch all unmatched routes */}
            <Route component={NotFound}/>
    </Switch>;