import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    component={(props) =>
      isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

const mapStatetoProps = (state) => ({
  isAuthenticated: state.isAuthenticated,
});

export default connect(mapStatetoProps)(PrivateRoute);
