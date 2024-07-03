import React, { useEffect } from "react";
import "./style.css";
import { fetchOrders } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
function Orders() {
  const dispatch = useDispatch();
  const { customers, products, orders } = useSelector((store) => store);
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch, orders]);
  return <div>Orders</div>;
}

export default Orders;
