import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { auth } from "../../App";
import { routes } from "../../constants";

interface Props extends RouteProps {
  authenticationPath?: string;
}

const PrivateRoute = (props: Props) => {
  const { authenticationPath } = props;

  const [user] = useAuthState(auth);
  const isAuthenticated = !!user;

  let redirectPath = "";

  if (!isAuthenticated) redirectPath = authenticationPath || routes.login;
  if (redirectPath) {
    const renderComponent = () => <Redirect to={{ pathname: redirectPath }} />;
    return <Route {...props} component={renderComponent} />;
  }
  return <Route {...props} />;
};

export default PrivateRoute;
