import React from "react";
import Login from "../../Authentication/Login";
import Signup from "../../Authentication/Signup";
import Header from "../../Header";
import "./index.css";

const Modal = ({ modal, setModal, token, setUserToken }) => {
  return (
    <div className={modal ? "modal displayed" : "hidden"}>
      {/* <div>
        <div className="wrapper">
          <Logo setModal={setModal} />
        </div>
      </div> */}
      <Header setModal={setModal} token={token} setUserToken={setUserToken} />
      {modal === "Login" && (
        <Login setUserToken={setUserToken} setModal={setModal} />
      )}
      {modal === "Signup" && (
        <Signup setUserToken={setUserToken} setModal={setModal} />
      )}
    </div>
  );
};

export default Modal;
