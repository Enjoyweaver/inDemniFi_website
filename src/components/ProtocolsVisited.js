// components/ProtocolsVisited.js
import React from "react";

function ProtocolsVisited({ walletAddress, chainId }) {
  return (
    <div>
      <h2>Protocols Visited</h2>
      <p>
        Display the protocols that wallet {walletAddress} has interacted with on
        chain ID {chainId}.
      </p>
      {/* Implement the actual logic here */}
    </div>
  );
}

export default ProtocolsVisited;
