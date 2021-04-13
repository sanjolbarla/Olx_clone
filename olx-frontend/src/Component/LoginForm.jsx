import Navbar from "./Navbar";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./login.css";
import { useSnackbar } from "material-ui-snackbar-provider";
import { fetchUserSuccess } from "../redux/user/userActions";

function LoginForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const snackbar = useSnackbar();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      axios({
        method: "post",
        url: "http://localhost:5001/loginUser",
        data: values,
        headers: { "Content-Type": "application/json" },
      })
        .then(function (res) {
          //handle success
          console.log(res.data);
          if (res.data.status === "success") {
            const user = res.data;
            dispatch(fetchUserSuccess(user));
            localStorage.setItem("user", JSON.stringify(res.data));

            history.push("/secret");
          } else {
            // alert("");
            // history.push("/login");
            snackbar.showMessage(
              "Invalid email-id or password",
              "Try Again",
              () => {
                history.push("/login");
              }
            );
          }
        })
        .catch(function (err) {
          //handle error
          console.log(err);
        });
    },
  });

  return (
    <div>
      <Navbar />

      <div className="root">
        <form onSubmit={formik.handleSubmit} className="form">
          <h1 style={{ textAlign: "center" }}>Login</h1>
          <TextField
            fullWidth
            margin="normal"
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            margin="normal"
            id="password"
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            autoComplete="on"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <br />
          <center>
            <Button
              color="primary"
              variant="contained"
              type="submit"
              className="button"
            >
              Submit
            </Button>
          </center>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
