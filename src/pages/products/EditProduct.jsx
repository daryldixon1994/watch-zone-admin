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
function EditProduct({ setShow }) {
  let { token } = JSON.parse(sessionStorage.getItem("session-data"));
  const [file, setFile] = useState(null);
  const [productData, setProductData] = useState({});
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  return (
    <>
      <Form loading={loading}>
        <FormField
          id="form-input-control"
          control={Input}
          type="file"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
          widths={1}
        />
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
        <Button>Save</Button>
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
