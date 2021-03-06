import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import axios from "axios";
import Loader from "react-loader-spinner";

import OfferCard from "../OfferCard";
import Paging from "../../Share/Paging";
import SortCriteria from "../../Share/Criteria/SortCriteria";
import {
  SORT_BY_PRICE_ASC,
  SORT_BY_PRICE_DESC,
} from "../../Share/Criteria/SortCriteria";
import "./index.css";

const noneResult = "Aucun résultat";

const getOffers = async (
  setOffers,
  setIsLoading,
  setCurrentPage,
  setCountPage,
  requestedPage,
  setRefreshOffers,
  searchCriteria,
  setCountResult,
  sort,
  setRequestedPage
) => {
  const pageSize = 10;
  let url =
    Cookies.get("BackUrl") +
    "offers?page=" +
    requestedPage +
    "&limit=" +
    pageSize;

  url +=
    searchCriteria && searchCriteria.title
      ? `&title=${searchCriteria.title}`
      : "";
  url +=
    searchCriteria && Number(searchCriteria.minimalPrice)
      ? `&priceMin=${Number(searchCriteria.minimalPrice)}`
      : "";
  url +=
    searchCriteria && Number(searchCriteria.maximalPrice)
      ? `&priceMax=${Number(searchCriteria.maximalPrice)}`
      : "";
  if (sort === SORT_BY_PRICE_ASC) {
    url += "&sort=price-asc";
  }
  if (sort === SORT_BY_PRICE_DESC) {
    url += "&sort=price-desc";
  }

  try {
    const response = await axios.get(url);
    const nbPages = Math.ceil(Number(response.data.count) / pageSize);
    setCurrentPage(requestedPage);
    setCountPage(nbPages);
    let result =
      response.data.count > 0
        ? `${response.data.count} résultat(s)`
        : noneResult;
    setCountResult(result);
    setOffers(response.data.offers);
    setIsLoading(false);
    setRefreshOffers(false);

    Cookies.set(
      "offers-current-page",
      nbPages < requestedPage ? 1 : requestedPage
    );
    nbPages < requestedPage && setRequestedPage(1);
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data && error.response.data.message) {
      alert(
        "Le chargement est impossible pour la raison suivante : \n\n" +
          error.response.data.message
      );
    } else if (
      error.response &&
      error.response.data &&
      error.response.data.error &&
      error.response.data.error.message
    ) {
      alert(
        "Le chargement est impossible pour la raison suivante : \n\n" +
          error.response.data.error.message
      );
    } else {
      alert("Une erreur bloque le chargement des données");
    }
    setIsLoading(false);
  }
};

const Offers = ({
  sort,
  setSort,
  refreshOffers,
  setRefreshOffers,
  searchCriteria,
}) => {
  const initialPage = Number(Cookies.get("offers-current-page"));
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [countPage, setCountPage] = useState(1);
  const [countResult, setCountResult] = useState(noneResult);
  const [requestedPage, setRequestedPage] = useState(
    initialPage ? initialPage : 1
  );
  const [displaySortCriteria, setDisplaySortCriteria] = useState(false);

  useEffect(() => {
    getOffers(
      setOffers,
      setIsLoading,
      setCurrentPage,
      setCountPage,
      requestedPage,
      setRefreshOffers,
      searchCriteria,
      setCountResult,
      sort,
      setRequestedPage
    );
  }, [requestedPage, refreshOffers, setRefreshOffers, searchCriteria, sort]);

  return isLoading ? (
    <div className="offers wrapper">
      <Loader type="BallTriangle" color="#09b1ba" height={80} width={80} />
    </div>
  ) : (
    <div className="offers wrapper">
      <div>
        <span>{countResult}</span>{" "}
        <div className="offers-sorter">
          <div
            onClick={() => {
              setDisplaySortCriteria(!displaySortCriteria);
            }}
          >
            <span>Trier par</span>
            <FontAwesomeIcon icon={faCaretDown} />
          </div>

          {displaySortCriteria && (
            <div className="sort-criteria-selector">
              <SortCriteria sort={sort} setSort={setSort} />
            </div>
          )}
        </div>
      </div>
      <div className="offers-cards">
        {offers.map((offer, index) => {
          return <OfferCard key={index} offer={offer} />;
        })}
      </div>
      <Paging
        currentPage={currentPage}
        countPage={countPage}
        setRequestedPage={setRequestedPage}
      />
    </div>
  );
};

export default Offers;
