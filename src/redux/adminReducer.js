const initialState = {
  customers: [],
  products: [],
  orders: [],
};

const adminReducer = (state = initialState, action) => {
  // console.log(action.payload);
  switch (action.type) {
    case "GET_CUSTOMERS":
      return { ...state, customers: action.payload };
    case "GET_PRODUCTS":
      return { ...state, products: action.payload };
    case "GET_ORDERS":
      return { ...state, orders: action.payload };
    default:
      return state;
  }
};

export default adminReducer;
