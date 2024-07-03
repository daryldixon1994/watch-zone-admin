import { createStore, applyMiddleware } from "redux";
import adminReducer from "./adminReducer";
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";
export const store = createStore(
  adminReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
