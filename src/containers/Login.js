import React from "react";
import Login from "../components/Authentication/Login";

const LoginPage = ({ setUserToken }) => {
  return (
    <div>
      <Login setUserToken={setUserToken} />;
    </div>
  );
};

export default LoginPage;
