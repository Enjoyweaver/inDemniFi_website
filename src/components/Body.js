import React from "react";

const Body = () => {
  return (
    <p
      style={{
        fontSize: "1.7em",
        margin: "15px auto",
        padding: "0px 0px 30px",
        textAlign: "center",
        color: "lightblue",
        width: "60vw",
      }}
    >
      We're currently developing the Insurance Wallet, which is here to help you
      understand and manage risks as you navigate Web3. It gives you insight
      into your onchain activities, showing you where risks might be and helping
      you stay in control.
      <br />
      <br />
      During the development of the Insurance Wallet, we've come to realize that
      our wallet risk analysis tool could be a valuable tool for others.
      <br />
      <br />
      Connect your wallet to view analysis of your transaction history and open
      approvals. You'll also have the ability to revoke those approvals for
      added security.
    </p>
  );
};

export default Body;
