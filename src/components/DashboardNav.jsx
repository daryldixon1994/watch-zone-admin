import React from "react";
import "./style.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
function DashboardNav() {
  const { customers, products, orders } = useSelector((store) => store);
  const activeStyle = {
    color: "#e5e5e5",
    textDecoration: "underline",
    fontWeight: "800",
    textUnderlineOffset: "10px",
  };
  const notActiveStyle = {
    color: "#b38d3a",
  };
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
          Customers ({customers.length})
        </NavLink>
        <NavLink
          style={({ isActive }) => {
            return isActive ? activeStyle : notActiveStyle;
          }}
          to="/admin/products"
        >
          Products ({products.length})
        </NavLink>
        <NavLink
          style={({ isActive }) => {
            return isActive ? activeStyle : notActiveStyle;
          }}
          to="/admin/orders"
        >
          Orders ({orders.length})
        </NavLink>
        <NavLink style={notActiveStyle}>Logout</NavLink>
      </div>
    </div>
  );
}

export default DashboardNav;
