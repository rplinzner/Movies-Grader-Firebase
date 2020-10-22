import React, { ReactElement } from "react";
import { Route, Switch } from "react-router-dom";
import { routes } from "../constants";
import Grades from "./Grades";
import { PrivateRoute } from "./_modules";
import NotFound from "./NotFound";
import Login from "./Login";

export default (): ReactElement => {
  return (
    <Switch>
      <Route path={routes.login} exact component={Login} />
      <PrivateRoute path={routes.grade} exact component={Grades} />
      <Route component={NotFound} />
    </Switch>
  );
};
