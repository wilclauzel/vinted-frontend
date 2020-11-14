import React from "react";
import "./index.css";

const Presentation = ({ modal }) => {
  return modal ? (
    <></>
  ) : (
    <div className="presentation">
      <img
        src="https://images.vinted.net/thumbs/2560x1441/01_02434_WmVH4RMJbNdjUihjTmcy88Hs.jpeg?1597418184-33de50ff57f33de3df30f899be8280cc6a70c820"
        alt="vinted presentation"
      ></img>
      <div className="seller-shortcut">
        <h2>Prêts à faire du tri dans vos placards ?</h2>
        <div className="seller-shortcut-link">
          <button>Commencer à vendre</button>
          <p>Découvrir comment ça marche</p>
        </div>
      </div>
      <div className="fond-dechire"></div>
    </div>
  );
};

export default Presentation;
