import axios from "axios";

export const fetchCustomers = () => (dispatch) => {
  let session = JSON.parse(sessionStorage.getItem("session-data"));
  axios
    .get("https://watch-zone.onrender.com/api/admin/customers", {
      headers: {
        token: session?.token,
        "access-control-allow-origin": "http://localhost:3000/",
      },
    })
    .then((res) => {
      //   console.log(res);
      dispatch({ type: "GET_CUSTOMERS", payload: res.data.data });
    })
    .catch((err) => {
      window.location.replace("/");
      console.dir(err);
    });
};
export const fetchProducts = (payload) => (dispatch) => {
  let session = JSON.parse(sessionStorage.getItem("session-data"));
  axios
    .get("https://watch-zone.onrender.com/api/admin/products", {
      headers: {
        token: session?.token,
        "access-control-allow-origin": "http://localhost:3000/",
      },
    })
    .then((res) => {
      //   console.log(res);
      dispatch({ type: "GET_PRODUCTS", payload: res.data.data });
    })
    .catch((err) => {
      window.location.replace("/");
      console.dir(err);
    });
};
export const fetchOrders = (payload) => (dispatch) => {
  let session = JSON.parse(sessionStorage.getItem("session-data"));
  axios
    .get("https://watch-zone.onrender.com/api/admin/getOrders", {
      headers: {
        token: session?.token,
        "access-control-allow-origin": "http://localhost:3000/",
      },
    })
    .then((res) => {
      dispatch({ type: "GET_ORDERS", payload: res.data.data });
    })
    .catch((err) => {
      window.location.replace("/");
      console.dir(err);
    });
};
