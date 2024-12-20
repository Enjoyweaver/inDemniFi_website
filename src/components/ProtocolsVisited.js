import React, { useState, useEffect } from "react";
import Protocols from "./Protocols";
import protocolAddresses from "./ProtocolAddresses";

const ProtocolsVisited = ({ walletAddress, chainId }) => {
  const [protocolData, setProtocolData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = process.env.REACT_APP_COVALENT_API_KEY;

  useEffect(() => {
    const fetchProtocols = async () => {
      setIsLoading(true);
      try {
        const endpoint = `https://api.covalenthq.com/v1/${chainId}/address/${walletAddress}/transactions_v2/?key=${apiKey}`;
        const response = await fetch(endpoint);
        const result = await response.json();

        if (result.data && result.data.items) {
          const processedData = processTransactions(result.data.items);
          setProtocolData(processedData);
        } else {
          setError("No data available for the given wallet address.");
        }
      } catch (err) {
        console.error("Error fetching protocol data:", err);
        setError("Failed to fetch protocol data.");
      } finally {
        setIsLoading(false);
      }
    };

    if (walletAddress && chainId) {
      fetchProtocols();
    }
  }, [walletAddress, chainId, apiKey]);

  const processTransactions = (transactions) => {
    const protocolMap = {};

    transactions.forEach((txn) => {
      const toAddress = txn.to_address ? txn.to_address.toLowerCase() : null;
      const protocolName =
        toAddress && protocolAddresses[toAddress]
          ? protocolAddresses[toAddress]
          : "Unknown Protocol";

      const txnType = txn.tx_type || "Unknown Type";
      const gasFee =
        (parseFloat(txn.gas_spent || 0) * parseFloat(txn.gas_price || 0)) /
        1e18;
      const tokenValue = parseFloat(txn.value_quote || 0);

      if (!protocolMap[protocolName]) {
        protocolMap[protocolName] = {
          transactions: [],
          totalTokenValue: 0,
          totalGasFees: 0,
        };
      }

      protocolMap[protocolName].transactions.push({
        txnType,
        gasFee,
        tokenValue,
      });

      protocolMap[protocolName].totalTokenValue += tokenValue;
      protocolMap[protocolName].totalGasFees += gasFee;
    });

    return Object.entries(protocolMap).map(([protocolName, data]) => ({
      protocolName,
      transactions: data.transactions,
      totalTokenValue: data.totalTokenValue,
      totalGasFees: data.totalGasFees,
    }));
  };

  if (isLoading) return <p>Loading protocols...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="protocolsVisitedContainer">
      {protocolData.map((protocol, index) => (
        <Protocols
          key={index}
          protocolName={protocol.protocolName}
          transactions={protocol.transactions}
          totalTokenValue={protocol.totalTokenValue}
          totalGasFees={protocol.totalGasFees}
        />
      ))}
    </div>
  );
};

export default ProtocolsVisited;
