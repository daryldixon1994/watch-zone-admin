import React, { useEffect } from "react";
import "./style.css";
import { fetchCustomers } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import UserItem from "./UserItem";
function Users() {
  const dispatch = useDispatch();
  const { customers, products, orders } = useSelector((store) => store);
  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch, customers, products, orders]);

  return (
    <div class="page-container">
      <div id="customers-list">
        {customers ? (
          customers.map((customer) => <UserItem {...customer} />)
        ) : (
          <h3>Loading...</h3>
        )}
      </div>
    </div>
  );
}

export default Users;
