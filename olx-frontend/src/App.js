import "./App.css";
import { Router, Switch, Route } from "react-router-dom";

import LoginForm from "./Component/LoginForm";
import PrivateRoute from "./Component/PrivateRoute";
import PublicRoute from "./Component/PublicRoute";
import AdminRoute from "./Component/AdminRoute";
import FullDetails from "./Component/FullDetails";

import VerifyPosts from "./Component/Verification/VerifyPosts";
import FUpload from "./Component/FUpload";
import RegistrationForm from "./Component/RegistrationForm";
import Secret from "./Component/Secret";
import Home from "./Component/Home";
import { SnackbarProvider } from "material-ui-snackbar-provider";
import { Provider } from "react-redux";
import store from "./redux/store";
import { createBrowserHistory } from "history";

function App() {
  const history = createBrowserHistory();
  return (
    <Provider store={store}>
      <SnackbarProvider SnackbarProps={{ autoHideDuration: 4000 }}>
        <Router history={history}>
          <Switch>
            <PublicRoute path="/login" exact component={LoginForm} />
            <PublicRoute path="/register" exact component={RegistrationForm} />
            <PrivateRoute path="/secret" exact component={Secret} />
            <AdminRoute path="/verify" exact component={VerifyPosts} />
            <PrivateRoute path="/sell" exact component={FUpload} />
            <Route path="/sub" exact component={FullDetails} />
            <Route path="/" exact component={Home} />
          </Switch>
        </Router>
      </SnackbarProvider>
    </Provider>
  );
}

export default App;
