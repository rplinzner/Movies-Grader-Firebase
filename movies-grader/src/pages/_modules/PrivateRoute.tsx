import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { routes } from "../../constants";

interface Props extends RouteProps {
  authenticationPath?: string;
}

const PrivateRoute = (props: Props) => {
  const { authenticationPath } = props;

  // TODO: Add selecting user login state
  const isAuthenticated = false;

  let redirectPath = "";

  if (!isAuthenticated) redirectPath = authenticationPath || routes.login;
  if (redirectPath) {
    const renderComponent = () => <Redirect to={{ pathname: redirectPath }} />;
    return <Route {...props} component={renderComponent} />;
  }
  return <Route {...props} />;
};

export default PrivateRoute;
