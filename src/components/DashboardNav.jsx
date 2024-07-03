import React from "react";
import "./style.css";
import { NavLink, useNavigate } from "react-router-dom";

function DashboardNav() {
  const navigate = useNavigate();
  const activeStyle = {
    color: "#e5e5e5",
    textDecoration: "underline",
    fontWeight: "800",
    textUnderlineOffset: "10px",
  };
  const notActiveStyle = {
    color: "#b38d3a",
  };
  function handleLogout() {
    sessionStorage.clear();
    navigate("/");
  }
  return (
    <div id="dash-nav">
      <h3>WatchZone</h3>
      <div id="nav-links">
        <NavLink
          style={({ isActive }) => {
            return isActive ? activeStyle : notActiveStyle;
          }}
          to="/admin/dashboard"
        >
          Dashboard
        </NavLink>
        <NavLink
          style={({ isActive }) => {
            return isActive ? activeStyle : notActiveStyle;
          }}
          to="/admin/users"
        >
          Customers
        </NavLink>
        <NavLink
          style={({ isActive }) => {
            return isActive ? activeStyle : notActiveStyle;
          }}
          to="/admin/products"
        >
          Products
        </NavLink>
        <NavLink
          style={({ isActive }) => {
            return isActive ? activeStyle : notActiveStyle;
          }}
          to="/admin/orders"
        >
          Orders
        </NavLink>
        <NavLink style={notActiveStyle} onClick={() => handleLogout()}>
          Logout
        </NavLink>
      </div>
    </div>
  );
}

export default DashboardNav;
