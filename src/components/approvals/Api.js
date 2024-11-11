import { useState, useEffect } from 'react';
import '../../App.css';
import TokenAllowance from './TokenAllowance';
import Risk from './Risk';

function Api({ publicKey, chainId, txnSummaryData }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const approvalsEndpoint = `https://api.covalenthq.com/v1/${chainId}/approvals/${publicKey}/`;
  const apiKey = process.env.REACT_APP_COVALENT_API_KEY;
  const nftApprovalsEndpoint = `https://api.covalenthq.com/v1/${chainId}}/nft/approvals/${publicKey}}/`;


  useEffect(() => {
    if (publicKey) {
      setLoading(true);
      fetch(nftApprovalsEndpoint, {
        method: 'GET',
        headers: {
          Authorization: `Basic ${btoa(apiKey + ':')}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          if (res.data && res.data.items) {
            setData(res.data.items);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    }
  }, [nftApprovalsEndpoint, apiKey, publicKey, chainId]);

  useEffect(() => {
    if (publicKey) {
      setLoading(true);
      fetch(approvalsEndpoint, {
        method: 'GET',
        headers: {
          Authorization: `Basic ${btoa(apiKey + ':')}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          if (res.data && res.data.items) {
            setData(res.data.items);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    }
  }, [approvalsEndpoint, apiKey, publicKey, chainId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div className='noApprovals'>
        <div className='tokenTitle'>Risk Assessment</div>
        <p>Your wallet address on this blockchain currently has no open token approvals and is practicing web3 safely.</p>
      </div>
    );
  }

  return (
    <div>
      <div className='risk-container-title'>Risk Assessment</div>
      {/* Display Risk component even when there are no open approvals */}
      <Risk tokenItem={data.length > 0 ? data[0] : null} queryWalletAddress={publicKey} txnSummaryData={txnSummaryData} />
      {/* Display TokenAllowance component for each item if there are approvals */}
      {data.map((item, index) => (
        <TokenAllowance key={index} tokenItem={item} queryWalletAddress={publicKey} />
      ))}
    </div>
  );
}

export default Api;
