import axios from "axios";

export const fetchCustomers = () => (dispatch) => {
  let { token } = JSON.parse(sessionStorage.getItem("session-data"));
  axios
    .get("https://watch-zone.onrender.com/api/admin/customers", {
      headers: {
        token,
        "access-control-allow-origin": "http://localhost:3000/",
      },
    })
    .then((res) => {
      //   console.log(res);
      dispatch({ type: "GET_CUSTOMERS", payload: res.data.data });
    })
    .catch((err) => console.dir(err));
};
export const fetchProducts = (payload) => (dispatch) => {
  let { token } = JSON.parse(sessionStorage.getItem("session-data"));
  axios
    .get("https://watch-zone.onrender.com/api/admin/products", {
      headers: {
        token,
        "access-control-allow-origin": "http://localhost:3000/",
      },
    })
    .then((res) => {
      //   console.log(res);
      dispatch({ type: "GET_PRODUCTS", payload: res.data.data });
    })
    .catch((err) => console.dir(err));
};
export const fetchOrders = (payload) => (dispatch) => {
  let { token } = JSON.parse(sessionStorage.getItem("session-data"));
  axios
    .get("https://watch-zone.onrender.com/api/admin/getOrders", {
      headers: {
        token,
        "access-control-allow-origin": "http://localhost:3000/",
      },
    })
    .then((res) => {
      dispatch({ type: "GET_ORDERS", payload: res.data.data });
    })
    .catch((err) => console.dir(err));
};
