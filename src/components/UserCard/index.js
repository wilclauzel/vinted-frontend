import React from "react";
import "./index.css";

const UserCard = ({ username, imageUrl, smallSize }) => {
  return (
    <div className={smallSize ? "user-card-small" : "user-card"}>
      {imageUrl && <img src={imageUrl} alt={username} />}
      <span>{username}</span>
    </div>
  );
};

export default UserCard;
