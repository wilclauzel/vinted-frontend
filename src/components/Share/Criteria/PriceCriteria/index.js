import React from "react";

import "./index.css";

const PriceCriteria = ({
  minimalPrice,
  setMinimalPrice,
  maximalPrice,
  setMaximalPrice,
}) => {
  return (
    <div className="price-criteria">
      <div>
        <label>De</label>
        <input
          type="text"
          placeholder="EUR"
          value={minimalPrice}
          onChange={(e) => {
            setMinimalPrice(Number(e.target.value) ? e.target.value : "");
          }}
        />
      </div>
      <div>
        <label>A</label>
        <input
          type="text"
          placeholder="EUR"
          value={maximalPrice}
          onChange={(e) => {
            setMaximalPrice(Number(e.target.value) ? e.target.value : "");
          }}
        />
      </div>
    </div>
  );
};

export default PriceCriteria;
