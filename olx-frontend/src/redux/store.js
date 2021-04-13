import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import reducer from "./user/userReducer";

const loggerMiddleware = createLogger();

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware, loggerMiddleware))
);

export default store;
