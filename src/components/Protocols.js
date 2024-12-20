import React from "react";

const Protocols = ({
  protocolName,
  transactions,
  totalTokenValue,
  totalGasFees,
}) => {
  return (
    <div className="protocolItem">
      <h3>{protocolName}</h3>
      <p>Total Token Value: ${totalTokenValue?.toFixed(2) || "0.00"}</p>
      <p>Total Gas Fees: ${totalGasFees?.toFixed(4) || "0.0000"}</p>

      <div className="transactionDetails">
        <table>
          <thead>
            <tr>
              <th>Transaction Type</th>
              <th>Token Value ($)</th>
              <th>Gas Fees ($)</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn, index) => (
              <tr key={index}>
                <td>{txn.txnType}</td>
                <td>{txn.tokenValue.toFixed(2)}</td>
                <td>{txn.gasFee.toFixed(4)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Protocols;
