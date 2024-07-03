import React, { useEffect } from "react";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "./ProductItem";
import AddProduct from "../../components/AddProduct";
import { fetchProducts } from "../../redux/actions";
function Products() {
  const dispatch = useDispatch();
  const { products, customers, orders } = useSelector((store) => store);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch, customers, products, orders]);
  return (
    <div className="page-container">
      <div className="add-product-box">
        <AddProduct />
      </div>
      <div id="products-list">
        {products ? (
          products.map((product) => <ProductItem {...product} />)
        ) : (
          <h3>Loading...</h3>
        )}
      </div>
    </div>
  );
}

export default Products;
