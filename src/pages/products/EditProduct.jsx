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
import { ToastContainer, Bounce } from "react-toastify";
import "./style.css";
import { accessUrl, baseUrl } from "../../utils";
function EditProduct({ setShow, id, token }) {
  const [productData, setProductData] = useState({});
  const [loading, setLoading] = useState(false);
  function handleSave() {
    setLoading(true);
    axios
      .put(`${baseUrl}/updateProduct/${id}`, productData, {
        headers: {
          token,
          "access-control-allow-origin": accessUrl,
        },
      })
      .then((res) => {
        setLoading(false);
        setShow(false);
      })
      .catch((err) => {
        console.dir(err);
        setLoading(false);
      });
  }
  return (
    <>
      <Form loading={loading}>
        <FormField
          id="form-input-control-first-name"
          control={Input}
          type="text"
          placeholder="product name"
          onChange={(e) => {
            setProductData({ ...productData, pName: e.target.value });
          }}
          widths={1}
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
          widths={1}
        />

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
        <Button onClick={() => handleSave()}>Save</Button>
        <Button onClick={() => setShow(false)}>Cancel</Button>
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

export default EditProduct;
