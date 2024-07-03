import React, { useState } from "react";
import {
  CardMeta,
  CardHeader,
  CardContent,
  Card,
  Button,
  Image,
} from "semantic-ui-react";
import "./style.css";
import axios from "axios";
import { baseUrl, accessUrl, getToken } from "../../utils";
function UserItem({ fullName, email, phone, address, isBanned, _id }) {
  let token = getToken()
  const [laoding, setLoading] = useState(false);
  function handleBanUser() {
    setLoading(true);
    axios
      .put(
        `${baseUrl}/banCustomer/${_id}`,
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
  function handleUnbanUser() {
    setLoading(true);
    axios
      .put(
        `${baseUrl}/unbanCustomer/${_id}`,
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
    <Card className="user-item">
      <CardContent>
        <Image
          floated="right"
          size="mini"
          src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
        />
        <CardHeader>{fullName}</CardHeader>
        <CardMeta>{email}</CardMeta>
        <CardMeta>{phone}</CardMeta>
        <CardMeta>{address}</CardMeta>
      </CardContent>
      <CardContent extra>
        <div className="ui two buttons">
          <Button
            onClick={() => handleUnbanUser()}
            disabled={!isBanned}
            color="green"
          >
            Unban
          </Button>
          <Button
            onClick={() => handleBanUser()}
            disabled={isBanned}
            color="red"
            laoding={laoding}
          >
            Ban
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default UserItem;
