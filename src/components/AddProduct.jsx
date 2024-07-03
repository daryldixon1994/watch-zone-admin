import React, { useState } from "react";
import {
  TextArea,
  Button,
  FormField,
  Input,
  Form,
  FormGroup,
} from "semantic-ui-react";
import axios from "axios";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "./style.css";
function AddProduct() {
  let { token } = JSON.parse(sessionStorage.getItem("session-data"));
  const [file, setFile] = useState(null);
  const [productData, setProductData] = useState({});
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  function handleAddProduct() {
    setLoading(true);
    const productForm = new FormData();
    productForm.append("photo", file);
    productForm.append("pName", productData.pName);
    productForm.append("pPrice", productData.pPrice);
    productForm.append("pDesc", productData.pDesc);
    axios
      .post(
        "https://watch-zone.onrender.com/api/admin/addProduct",
        productForm,
        {
          headers: {
            token,
            "access-control-allow-origin": "http://localhost:3000/",
          },
        }
      )
      .then((res) => {
        setLoading(false);
        toast.success("Product was added successfully", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });

        // console.log(res);
      })
      .catch((err) => console.log(err));
  }
  return (
    <>
      <Form loading={loading}>
        <FormGroup widths="equal">
          <FormField
            id="form-input-control"
            control={Input}
            type="file"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          <FormField
            id="form-input-control-first-name"
            control={Input}
            type="text"
            placeholder="product name"
            onChange={(e) => {
              setProductData({ ...productData, pName: e.target.value });
            }}
          />
          <FormField
            control={Input}
            type="number"
            min={100}
            placeholder="product price"
            onChange={(e) => {
              setProductData({
                ...productData,
                pPrice: Number(e.target.value),
              });
            }}
          />
        </FormGroup>
        <FormGroup widths="equal">
          <FormField
            id="form-textarea-control-opinion"
            control={TextArea}
            type="text"
            placeholder="description"
            onChange={(e) => {
              setProductData({ ...productData, pDesc: e.target.value });
            }}
          />
        </FormGroup>
        <Button
          onClick={() => {
            handleAddProduct();
          }}
        >
          Save
        </Button>
      </Form>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default AddProduct;
