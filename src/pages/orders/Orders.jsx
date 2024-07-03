import React, {  useEffect } from "react";
import "./style.css";
import {
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableCell,
  TableBody,
  Table,
  ModalHeader,
  ModalContent,
  ModalActions,
  Button,
  Image,
  Modal,
} from "semantic-ui-react";
import { fetchOrders } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { baseUrl, accessUrl, getToken } from "../../utils";

function Orders() {
  const token = getToken();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  // const [open, setOpen] = React.useState(false);
  const { orders } = useSelector((store) => store);
  useEffect(() => {
    dispatch(fetchOrders());
  }, [orders, dispatch]);
  function handleConfirm(id) {
    setLoading(true);
    axios
      .put(
        `${baseUrl}/confirmOrder/${id}`,
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
        setLoading(false);
      });
  }
  function handleDeliver(id) {
    setLoading(true);
    axios
      .put(
        `${baseUrl}/deliverOrder/${id}`,
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
        setLoading(false);
      });
  }
  function handleCancel(id) {
    setLoading(true);
    axios
      .put(
        `${baseUrl}/cancelOrder/${id}`,
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
        setLoading(false);
      });
  }
  return (
    <div className="page-container">
      <h1>Orders List</h1>
      <Table singleLine>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Order ID</TableHeaderCell>
            <TableHeaderCell>Customer Name</TableHeaderCell>
            <TableHeaderCell>E-mail </TableHeaderCell>
            <TableHeaderCell>Phone</TableHeaderCell>
            <TableHeaderCell>Details</TableHeaderCell>
            <TableHeaderCell>Confirmed</TableHeaderCell>
            <TableHeaderCell>Canceled</TableHeaderCell>
            <TableHeaderCell>Delivered</TableHeaderCell>
            <TableHeaderCell>Total</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {orders.map((order) => (
            <TableRow>
              <TableCell>{order._id}</TableCell>
              <TableCell> {order.customerId.fullName} </TableCell>
              <TableCell>{order.customerId.email}</TableCell>
              <TableCell>{order.customerId.phone}</TableCell>
              <TableCell onClick={() => setOpen(true)}>
                <span id="show-more"> Show more</span>
              </TableCell>
              <TableCell>
                {order.isConfirmed ? (
                  "Yes"
                ) : order.isCanceled ? (
                  "No"
                ) : (
                  <Button
                    loading={loading}
                    size="mini"
                    onClick={() => handleConfirm(order._id)}
                  >
                    Confirm
                  </Button>
                )}
              </TableCell>
              <TableCell>
                {order.isCanceled ? (
                  "Yes"
                ) : order.isDelivered &&
                  order.isConfirmed &&
                  !order.isCanceled ? (
                  "No"
                ) : (
                  <Button
                    loading={loading}
                    size="mini"
                    onClick={() => handleCancel(order._id)}
                  >
                    Cancel
                  </Button>
                )}
              </TableCell>
              <TableCell>
                {order.isDelivered ? (
                  "Yes"
                ) : order.isCanceled ? (
                  "No"
                ) : (
                  <Button
                    loading={loading}
                    size="mini"
                    onClick={() => handleDeliver(order._id)}
                  >
                    Deliver
                  </Button>
                )}
              </TableCell>
              <TableCell>{order.total}</TableCell>
              <Modal onClose={() => setOpen(false)} open={open}>
                <ModalHeader>Upload image</ModalHeader>
                <ModalContent>
                  <Table padded>
                    <TableHeader>
                      <TableRow>
                        <TableHeaderCell></TableHeaderCell>
                        <TableHeaderCell>Product Name</TableHeaderCell>
                        <TableHeaderCell>Price</TableHeaderCell>
                        <TableHeaderCell>Available</TableHeaderCell>
                        <TableHeaderCell>Quantity</TableHeaderCell>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {order.cart.map((elt) => (
                        <TableRow>
                          <TableCell>
                            <Image size="small" src={elt.productId.pImg} />
                          </TableCell>
                          <TableCell>{elt.productId.pName}</TableCell>
                          <TableCell>{elt.productId.pPrice}</TableCell>
                          <TableCell>
                            {elt.productId.pAvailable ? "Yes" : "No"}
                          </TableCell>
                          <TableCell> {elt.qte} </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ModalContent>
                <ModalActions>
                  <Button onClick={() => setOpen(false)} positive>
                    Ok
                  </Button>
                </ModalActions>
              </Modal>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Orders;
