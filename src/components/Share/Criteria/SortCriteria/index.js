import React, { useState } from "react";

import "./index.css";

const SORT_NONE = "";
const SORT_BY_PRICE_ASC = "PriceAsc";
const SORT_BY_PRICE_DESC = "PriceDesc";

const SortCriteria = ({ sort, setSort }) => {
  const [isdefault, setIsDefault] = useState(sort === SORT_NONE);
  const [isPriceAsc, setIsPriceAsc] = useState(sort === SORT_BY_PRICE_ASC);
  const [isPriceDesc, setIsPriceDesc] = useState(sort === SORT_BY_PRICE_DESC);
  const handleUpdateCheckbox = (id, value) => {
    if (id === 1 && Boolean(isdefault) === false) {
      setIsDefault(true);
      setIsPriceAsc(false);
      setIsPriceDesc(false);
      setSort(SORT_NONE);
    }
    if (id === 2 && Boolean(isPriceAsc) === false) {
      setIsDefault(false);
      setIsPriceAsc(true);
      setIsPriceDesc(false);
      setSort(SORT_BY_PRICE_ASC);
    }
    if (id === 3 && Boolean(isPriceDesc) === false) {
      setIsDefault(false);
      setIsPriceAsc(false);
      setIsPriceDesc(true);
      setSort(SORT_BY_PRICE_DESC);
    }
  };
  return (
    <div className="sort-criteria">
      <div>
        <span>Aucun</span>
        <div>
          <input
            id="1"
            className="cbox"
            type="checkbox"
            checked={isdefault}
            onChange={(e) => {
              handleUpdateCheckbox(1, e.target.checked);
            }}
          />
          <label htmlFor={"1"}></label>
        </div>
      </div>
      <div>
        <span>Prix ascendant</span>{" "}
        <div>
          <input
            id="2"
            className="cbox"
            type="checkbox"
            checked={isPriceAsc}
            onChange={(e) => {
              handleUpdateCheckbox(2, e.target.checked);
            }}
          />
          <label htmlFor={"2"}></label>
        </div>
      </div>
      <div>
        <span>Prix descendant</span>{" "}
        <div>
          <input
            id="3"
            className="cbox"
            type="checkbox"
            checked={isPriceDesc}
            onChange={(e) => {
              handleUpdateCheckbox(3, e.target.checked);
            }}
          />
          <label htmlFor={"3"}></label>
        </div>
      </div>
    </div>
  );
};

export default SortCriteria;
