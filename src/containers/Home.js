import React from "react";
import Cookies from "js-cookie";
import Presentation from "../components/Presentation";
import Offers from "../components/Offer/Offers";

const Home = ({
  modal,
  sort,
  setSort,
  refreshOffers,
  setRefreshOffers,
  searchCriteria,
}) => {
  Cookies.set("lastPage", "/");
  return (
    <div>
      <Presentation modal={modal} />
      <Offers
        sort={sort}
        setSort={setSort}
        searchCriteria={searchCriteria}
        refreshOffers={refreshOffers}
        setRefreshOffers={setRefreshOffers}
      />
    </div>
  );
};

export default Home;
