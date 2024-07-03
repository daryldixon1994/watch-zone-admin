import React, { useState } from "react";
import {
  CardMeta,
  CardHeader,
  CardContent,
  CardDescription,
  Card,
  Button,
  ButtonGroup,
  Image,
  ModalHeader,
  ModalContent,
  ModalActions,
  Modal,
  Input,
  FormField,
} from "semantic-ui-react";
import { IoImageOutline } from "react-icons/io5";
import "./style.css";
import axios from "axios";
import EditProduct from "./EditProduct";
import { accessUrl, access, baseUrl, getToken } from "../../utils";

function exampleReducer(state, action) {
  switch (action.type) {
    case "close":
      return { open: false };
    case "open":
      return { open: true, size: "mini" };
    default:
      throw new Error("Unsupported action...");
  }
}

function ProductItem({ pName, pPrice, pDesc, pAvailable, pImg, _id }) {
  let token = getToken();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [file, setFile] = useState();
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    size: undefined,
  });
  const { open, size } = state;
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
  function handleAvailability() {
    setLoading(true);
    axios
      .put(
        `${baseUrl}/updateAvailability/${_id}`,
        {},
        {
          headers: {
            token,
            "access-control-allow-origin": accessUrl,
          },
        }
      )
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => {
        console.dir(err);
        setLoading(false);
      });
  }
  function handleUpdatePhoto() {
    setLoading(true);
    const imgForm = new FormData();
    imgForm.append("photo", file);
    axios
      .put(`${baseUrl}/updateProductImage/${_id}`, imgForm, {
        headers: {
          token,
          "access-control-allow-origin": accessUrl,
        },
      })
      .then((res) => {
        setLoading(false);
        dispatch({ type: "close" });
      })
      .catch((err) => {
        setLoading(false);
        console.dir(err);
      });
  }
  return (
    <Card color={pAvailable ? "green" : "red"} className="product-item">
      {show ? (
        <EditProduct token={token} id={_id} setShow={setShow} />
      ) : (
        <CardContent>
          {/* <Button icon>
            <IoImageOutline size={25} />
          </Button> */}
          <Image
            label={{
              as: "a",
              corner: "left",
              icon: (
                <IoImageOutline
                  size={22}
                  onClick={() => dispatch({ type: "open" })}
                />
              ),
            }}
            floated="right"
            size="large"
            src={pImg}
          />
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
        {!show && (
          <div className="ui two buttons">
            <ButtonGroup compact fluid>
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

              <Button
                loading={loading}
                color="orange"
                inverted
                size="mini"
                onClick={() => handleAvailability()}
              >
                {pAvailable ? "Set as not available" : "Set as available"}
              </Button>
            </ButtonGroup>
          </div>
        )}
      </CardContent>
      <Modal
        size={size}
        open={open}
        onClose={() => dispatch({ type: "close" })}
      >
        <ModalHeader>Update product's picture</ModalHeader>
        <ModalContent>
          <FormField
            id="form-input-control"
            control={Input}
            type="file"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
        </ModalContent>
        <ModalActions>
          <Button negative onClick={() => dispatch({ type: "close" })}>
            Cancel
          </Button>
          <Button
            loading={loading}
            positive
            onClick={() => handleUpdatePhoto()}
          >
            Save
          </Button>
        </ModalActions>
      </Modal>
    </Card>
  );
}

export default ProductItem;
