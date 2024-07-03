import React, { useEffect } from "react";
import "./style.css";
import { FaUsers, FaListAlt } from "react-icons/fa";
import { RiNewspaperFill } from "react-icons/ri";
import {
  fetchCustomers,
  fetchProducts,
  fetchOrders,
} from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
function Dashboard() {
  const dispatch = useDispatch();
  const { customers, products, orders } = useSelector((store) => store);
  useEffect(() => {
    dispatch(fetchCustomers());
    dispatch(fetchProducts());
    dispatch(fetchOrders());
  }, [dispatch, customers, products, orders]);
  return (
    <div id="admin-dashboard">
      {/* <h1>Admin Dashboard</h1> */}
      <div id="links-container">
        <Link to="/admin/users" className="dash-link">
          <FaUsers size={150} />
          Customers ({customers?.length})
        </Link>
        <Link to="/admin/products" className="dash-link">
          <FaListAlt size={150} />
          Products ({products?.length})
        </Link>
        <Link to="/admin/orders" className="dash-link">
          <RiNewspaperFill size={150} />
          Orders ({orders?.length})
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
