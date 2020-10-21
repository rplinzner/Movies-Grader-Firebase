import React, { ReactElement } from "react";
import { Route, Switch } from "react-router-dom";
import { routes } from "../constants";
import Grades from "./Grades";
import { PrivateRoute } from "./_modules";
import NotFound from "./NotFound";

export default (): ReactElement => {
  return (
    <Switch>
      {/* TODO: Add login component */}
      <Route path={routes.login} exact component={() => <h1>login</h1>} />
      <PrivateRoute path={routes.grade} exact component={Grades} />
      <Route component={NotFound} />
    </Switch>
  );
};
