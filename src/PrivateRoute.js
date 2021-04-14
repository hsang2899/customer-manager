import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContextProvider";

const PrivateRoute = ({ component: Component, ...rest }) => {
  // Add your own authentication on the below line.
  const [auth] = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        auth.token ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
