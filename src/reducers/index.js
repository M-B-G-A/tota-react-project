import appReducer from "./app";
import proxyReducer from "./proxy";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  app: appReducer,
  proxy: proxyReducer,
});

export default rootReducer;
