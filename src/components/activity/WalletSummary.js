//WalletSummary.js
import '../../App.css';
import { useState } from 'react';
import { blockExplorerURLs } from '../../utils/utils';
import { Spin } from 'antd';
import TransactionSummary from './TransactionSummary';


const WalletSummary = ({  chainId, chains, txnSummaryData }) => {
  const [loading, setLoading] = useState(false);
  const foundChain = blockExplorerURLs.find(item => item.chainId[0] === Number(chainId));
  const blockExplorerURL = foundChain.url;
  const selectedChain = chains.find(item => Number(item.chain_id) === Number(chainId));
  const selectedChainLogo = selectedChain ? selectedChain.logo_url : '';

  return (
    <>
        <div>
          <div className='txnSummaryContainer'>
            {loading ? (
              <div className='spinner'><Spin /></div>
            ) : (
              <TransactionSummary
                chainLogo={selectedChainLogo}
                txnSummaryData={txnSummaryData}
                blockExplorerURL={blockExplorerURL}
              />
            )}
          </div>
        </div>
    </>
  );
};

export default WalletSummary
