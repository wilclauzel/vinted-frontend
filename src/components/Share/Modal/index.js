import React from "react";
import Login from "../../Authentication/Login";
import Signup from "../../Authentication/Signup";
import Header from "../../Header";
import "./index.css";

const Modal = ({
  modal,
  setModal,
  token,
  setUserToken,
  searchCriteria,
  setSearchCriteria,
  setRefreshOffers,
}) => {
  return (
    <div className={modal ? "modal displayed" : "hidden"}>
      <Header
        setModal={setModal}
        token={token}
        setUserToken={setUserToken}
        searchCriteria={searchCriteria}
        setSearchCriteria={setSearchCriteria}
        setRefreshOffers={setRefreshOffers}
      />
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
