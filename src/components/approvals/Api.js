import { useState, useEffect } from "react";
import "../../App.css";
import TokenAllowance from "./TokenAllowance";
import Risk from "./Risk";

function Api({ publicKey, chainId, txnSummaryData }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null); // New state for API errors
  const approvalsEndpoint = `https://api.covalenthq.com/v1/${chainId}/approvals/${publicKey}/`;
  const apiKey = process.env.REACT_APP_COVALENT_API_KEY;

  useEffect(() => {
    if (publicKey) {
      setLoading(true);
      fetch(approvalsEndpoint, {
        method: "GET",
        headers: {
          Authorization: `Basic ${btoa(apiKey + ":")}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`API request failed with status ${res.status}`);
          }
          return res.json();
        })
        .then((res) => {
          if (res.data && res.data.items) {
            setData(res.data.items);
          } else {
            setData([]);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setApiError(
            "Unable to fetch approvals data for this blockchain. It may not be supported."
          );
          setLoading(false);
        });
    }
  }, [approvalsEndpoint, apiKey, publicKey, chainId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (apiError) {
    return (
      <div className="noApprovals">
        <div className="tokenTitle">Risk Assessment</div>
        <p>{apiError}</p>
      </div>
    );
  }

  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div className="noApprovals">
        <div className="tokenTitle">Risk Assessment</div>
        <p>
          Your wallet address on this blockchain currently has no open token
          approvals and is practicing web3 safely.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="risk-container-title">Risk Assessment</div>
      <Risk
        tokenItem={data.length > 0 ? data[0] : null}
        queryWalletAddress={publicKey}
        txnSummaryData={txnSummaryData}
      />
      {data.map((item, index) => (
        <TokenAllowance
          key={index}
          tokenItem={item}
          queryWalletAddress={publicKey}
        />
      ))}
    </div>
  );
}

export default Api;
