import React from "react";

import { connect, useDispatch } from "react-redux";
import { logoutUser } from "../redux/user/userActions";
import Navbar from "./Navbar";

function Secret(props) {
  const dispatch = useDispatch();
  let message;
  //   if (props.location.state.detail) {
  //     message = props.location.state.detail;
  //   }
  return (
    <div>
      <Navbar />
      <div style={{ textAlign: "center" }}>
        <h1>Successfully Logged In</h1>
        <p>{message}</p>
        <p>Full Name: {props.fullName}</p>
        <p>Email ID: {props.email}</p>
        <button
          onClick={() => {
            dispatch(logoutUser());
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

const mapStatetoProps = (state) => ({
  fullName: state.user.fullName,
  email: state.user.email,
});

export default connect(mapStatetoProps)(Secret);
