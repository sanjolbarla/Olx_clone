import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    component={(props) =>
      isAuthenticated ? <Redirect to="/" /> : <Component {...props} />
    }
  />
);

const mapStatetoProps = (state) => ({
  isAuthenticated: state.isAuthenticated,
});

export default connect(mapStatetoProps)(PublicRoute);
