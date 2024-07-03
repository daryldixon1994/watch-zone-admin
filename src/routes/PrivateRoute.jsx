import React from "react";
import { Navigate } from "react-router-dom";
function PrivateRoute({ children }) {
  let sessionData = JSON.parse(sessionStorage.getItem("session-data"));

  if (
    sessionData?.token &&
    sessionData?.id &&
    sessionData?.isLoggedIn &&
    sessionData?.isAdmin &&
    !sessionData?.isSubAdmin
  ) {
    return <> {children} </>;
  } else {
    return <Navigate to="/" />;
  }
}

export default PrivateRoute;
