import React from "react";

import Signup from "../components/Authentication/Signup";

const SignupPage = ({ setUserToken }) => {
  return (
    <div>
      <Signup setUserToken={setUserToken} />
    </div>
  );
};

export default SignupPage;
