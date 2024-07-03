import React, { useState } from "react";
import {
  CardMeta,
  CardHeader,
  CardContent,
  CardDescription,
  Card,
  Button,
  Image,
} from "semantic-ui-react";
import "./style.css";
import axios from "axios";
import EditProduct from "./EditProduct";
import { accessUrl, baseUrl, getToken } from "../../utils";
function ProductItem({ pName, pPrice, pDesc, pAvailable, pImg, _id }) {
  let token = getToken();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  function handleEdit() {
    setShow(true);
  }
  function handleDelete() {
    setLoading(true);
    axios
      .delete(`${baseUrl}/deleteProduct/${_id}`, {
        headers: {
          token,
          "access-control-allow-origin": accessUrl,
        },
      })
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }
  return (
    <Card color={pAvailable ? "green" : "red"} className="product-item">
      {show ? (
        <EditProduct setShow={setShow} />
      ) : (
        <CardContent>
          <Image floated="right" size="large" src={pImg} />
          <CardHeader>{pName}</CardHeader>
          <CardDescription>
            {" "}
            {pAvailable ? (
              <span style={{ color: "green", fontWeight: "800" }}>
                Available
              </span>
            ) : (
              <span style={{ color: "red", fontWeight: "800" }}>
                Out of stock
              </span>
            )}{" "}
          </CardDescription>
          <CardMeta>{pPrice}</CardMeta>
          {/* <CardMeta>{pDesc}</CardMeta> */}
        </CardContent>
      )}
      <CardContent extra>
        <div className="ui two buttons">
          <Button color="green" inverted onClick={() => handleEdit()}>
            Edit
          </Button>
          <Button
            loading={loading}
            color="red"
            inverted
            onClick={() => handleDelete()}
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProductItem;
