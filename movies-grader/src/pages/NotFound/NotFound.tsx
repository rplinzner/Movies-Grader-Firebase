import React from "react";
import { Link } from "react-router-dom";
import { routes } from "../../constants";

interface Props {}

const NotFound = (props: Props) => {
  return (
    <div>
      <p style={{ textAlign: "center" }}>
        <Link to={routes.grade}>Go to Home </Link>
      </p>
    </div>
  );
};

export default NotFound;
