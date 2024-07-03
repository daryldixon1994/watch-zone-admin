import React from "react";
import DashboardNav from "../components/DashboardNav";
import { Outlet } from "react-router-dom";
function AdminLayout() {
  return (
    <div id="admin-layout">
      <DashboardNav />
      <Outlet />
    </div>
  );
}

export default AdminLayout;
