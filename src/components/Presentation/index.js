import React from "react";
import "./index.css";

const Presentation = () => {
  return (
    <div className="presentation">
      <img
        src="https://images.vinted.net/thumbs/2560x1441/01_02434_WmVH4RMJbNdjUihjTmcy88Hs.jpeg?1597418184-33de50ff57f33de3df30f899be8280cc6a70c820"
        alt="vinted presentation"
      ></img>
      <div className="seller-shortcut">
        <h2>Prêts à faire du tri dans vos placards ?</h2>
        <button>Commencer à vendre</button>
        <a href="">Découvrir comment ça marche</a>
      </div>
      <div className="fond-dechire">
        {/* <img
          src="https://www.vinted.fr/assets/seller-promotion/tear-cb30a259a261a54b1511a7088e72118801d10d300901837c655cb53add179620.svg"
          alt="vinted dechire"
        ></img> */}
      </div>
    </div>
  );
};

export default Presentation;
