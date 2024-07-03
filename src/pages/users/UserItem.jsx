import React from "react";
import {
  CardMeta,
  CardHeader,
  CardContent,
  Card,
  Button,
  Image,
} from "semantic-ui-react";
import "./style.css";
function UserItem({ fullName, email, phone, address, isBanned, _id }) {
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
          <Button  disabled={!isBanned}  color="green">
            Unban
          </Button>
          <Button disabled={isBanned} color="red">
            Ban
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default UserItem;
