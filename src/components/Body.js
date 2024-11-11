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
      We're currently developing the Wallet Insurance Model (WIM SDK) to enable
      crypto wallets to provide insurance and risk management services to their
      users.
      <br />
      <br />
      During the development of the WIM SDK, we've come to realize that our
      wallet risk analysis tool could be a valuable tool for others. With the
      support of a grant from Covalent for API credits over the next year, we
      are excited to offer this tool to the public free of charge.
      <br />
      <br />
      Connect your wallet to view analysis of your transaction history and open
      approvals. You'll also have the ability to revoke those approvals for
      added security.
    </p>
  );
};

export default Body;
