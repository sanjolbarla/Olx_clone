import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

export const AdminRoute = ({
  isAuthenticated,
  role,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    component={(props) =>
      //   isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      {
        if (isAuthenticated) {
          if (role === "admin") {
            return <Component {...props} />;
          } else {
            return <Redirect to="/" />;
          }
        } else {
          return <Redirect to="/" />;
        }
      }
    }
  />
);

const mapStatetoProps = (state) => ({
  isAuthenticated: state.isAuthenticated,
  role: state.user.role,
});

export default connect(mapStatetoProps)(AdminRoute);
