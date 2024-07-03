import React from "react";
import { Navigate } from "react-router-dom";
function PublicRoute({ children }) {
  let sessionData = JSON.parse(sessionStorage.getItem("session-data"));
  if (
    sessionData?.token &&
    sessionData?.id &&
    sessionData?.isLoggedIn &&
    sessionData?.isAdmin &&
    !sessionData?.isSubAdmin
  ) {
    return <Navigate to="/admin/dashboard" />;
  } else {
    return <> {children} </>;
  }
}

export default PublicRoute;
