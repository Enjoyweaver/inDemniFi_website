//TokenAllowance.js
import '../../App.css'
import Token from './Token'
import Contracts from './Contracts'

const TokenAllowance = ({ tokenItem, queryWalletAddress }) => {
    if (!tokenItem || (Array.isArray(tokenItem) && tokenItem.length === 0)) {
      return <div></div>;
    }
  
    return (
      <>
        <div className='approvalsContainer'>
          <Token tokenItem={tokenItem} />
          <div className='headers'>
            <div>Approved to</div>
            <div>Value of Approval</div>
            <div>Value at Risk</div>
            <div>Date approved</div>

          </div>
          <Contracts
            spenders={tokenItem.spenders}
            tokenAddress={tokenItem.token_address}
            queryWalletAddress={queryWalletAddress}
          />
        </div>
      </>
    );
  };
  
  export default TokenAllowance;
  