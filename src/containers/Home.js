import React from "react";
import Presentation from "../components/Presentation";
import Offers from "../components/Offer/Offers";

const Home = ({ modal, refreshOffers, setRefreshOffers, searchCriteria }) => {
  return (
    <div>
      <Presentation modal={modal} />
      <Offers
        searchCriteria={searchCriteria}
        refreshOffers={refreshOffers}
        setRefreshOffers={setRefreshOffers}
      />
    </div>
  );
};

export default Home;
