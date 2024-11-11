import React, { useContext } from 'react';
import '../../App.css';
import { safeAddresses, blacklistedAddresses, complianceList, Protocol, swapRouter  } from './RiskAddresses';

const calculateUnlimitedApprovalPercentage = (unlimitedApprovals, totalApprovals) => {
  if (totalApprovals === 0) return '0.00'; // Return '0.00' when totalApprovals is 0

  const percentage = (unlimitedApprovals / totalApprovals) * 100;
  return percentage.toFixed(2) || '0.00'; // Return '0.00' if percentage is falsy
};

const calculateApprovalIndex = (
  lowRiskApprovals,
  mediumRiskApprovals,
  highRiskApprovals,
  blacklistedApprovals,
  walletBalance,
  totalWalletBalance
) => {
  const lowRiskWeight = 0.1;
  const mediumRiskWeight = 0.3;
  const highRiskWeight = 0.95;
  const blacklistedWeight = 1;

  // Calculate the weighted indices based on risk level and wallet exposure
  const weightedLowRisk = lowRiskApprovals * lowRiskWeight * (walletBalance / totalWalletBalance);
  const weightedMediumRisk = mediumRiskApprovals * mediumRiskWeight * (walletBalance / totalWalletBalance);
  const weightedHighRisk = highRiskApprovals * highRiskWeight * (walletBalance / totalWalletBalance);
  const weightedBlacklisted = blacklistedApprovals * blacklistedWeight * (walletBalance / totalWalletBalance);

  // Calculate the total weighted approval indices
  const totalWeightedApprovals = weightedLowRisk + weightedMediumRisk + weightedHighRisk + weightedBlacklisted;

  // Calculate the overall approval index by averaging the weighted indices
  const numberOfRiskLevels = 4; // Considering 4 risk levels
  const approvalIndex = totalWeightedApprovals / numberOfRiskLevels;

  return approvalIndex.toFixed(2); // Return the approval index rounded to two decimal places
};

const calculatePortfolioRisk = (
  openApprovalRate,
  approvalExposure,
  protocolRiskRate,
  complianceRiskRate,
  unlimitedApprovalPercentage 
) => {
  const weights = {
    openApprovalWeight: 0.35, 
    approvalExposureWeight: 0.2, 
    protocolRiskWeight: 0.15, 
    complianceRiskWeight: 0.05, 
    unlimitedApprovalWeight: 0.25
  };

  const weightedOpenApproval = openApprovalRate * weights.openApprovalWeight;
  const weightedApprovalExposure = approvalExposure * weights.approvalExposureWeight;
  const weightedProtocolRisk = protocolRiskRate * weights.protocolRiskWeight;
  const weightedComplianceRisk = complianceRiskRate * weights.complianceRiskWeight;
  const weightedUnlimitedApproval = unlimitedApprovalPercentage * weights.unlimitedApprovalWeight;

  const portfolioRisk =
    weightedOpenApproval +
    weightedApprovalExposure +
    weightedProtocolRisk +
    weightedComplianceRisk +
    weightedUnlimitedApproval;

  return portfolioRisk.toFixed(2); // Return the risk rounded to two decimal places
};


const Risk = ({ tokenItem, txnSummaryData, spenders }) => {
  if (!tokenItem || (Array.isArray(tokenItem) && tokenItem.length === 0) || !txnSummaryData || !txnSummaryData[0]) {
    return <div>No open approvals or transaction data available</div>;
  }

  const transactionCount = txnSummaryData[0].total_count;
  const currentDate = new Date(); // Get the current date
  const approvalDates = tokenItem.spenders.map((spender) => new Date(spender.block_signed_at)); // Extract approval dates
  const openApprovalRate = (tokenItem.spenders.length / transactionCount) * 100;

  // Find the oldest approval date
  const oldestApprovalDate = new Date(Math.min(...approvalDates.map(date => date.getTime())));

  // Calculate the difference in milliseconds
  const difference = currentDate - oldestApprovalDate;

  // Convert milliseconds to days
  const daysDifference = Math.floor(difference / (1000 * 60 * 60 * 24));
  
  const safeApprovals = tokenItem.spenders.filter(spender =>
    safeAddresses.includes(spender.spender_address.toLowerCase())
  ).length;


  
  const blacklistedApprovals = tokenItem.spenders.filter(spender =>
    blacklistedAddresses.includes(spender.spender_address.toLowerCase())
  ).length;

  console.log("Safe Approvals count:", safeApprovals);
  
  const unknownAddresses = tokenItem.spenders.filter(spender =>
    !safeAddresses.includes(spender.spender_address.toLowerCase()) &&
    !blacklistedAddresses.includes(spender.spender_address.toLowerCase())
  ).map(spender => spender.spender_address.toLowerCase());
  

  const lowRiskApprovals = tokenItem.spenders.filter(spender =>
    safeAddresses.includes(spender.spender_address.toLowerCase())
  ).length;
  
  const mediumRiskApprovals = tokenItem.spenders.filter(spender =>
    unknownAddresses.includes(spender.spender_address.toLowerCase())
  ).length;

  const highRiskApprovals = tokenItem.spenders.filter(spender =>
    blacklistedAddresses.includes(spender.spender_address.toLowerCase())
  ).length;
  
  const unlimitedApprovals = tokenItem.spenders.filter(
    spender => spender.allowance === "UNLIMITED"
  ).length;

  const nftApprovals = tokenItem.spenders.filter(spender =>
    spender.contract_ticker_symbol === "NFT" 
  ).length;

  const complianceRisk = tokenItem.spenders.filter(spender =>
    complianceList.includes(spender.spender_address.toLowerCase())
  ).length;

  // Count transactions not on compliance list
  const nonComplianceRisk = tokenItem.spenders.filter(spender =>
    !complianceList.includes(spender.spender_address.toLowerCase())
  ).length;

  // Calculate Compliance Risk Rate as a percentage
  const complianceRiskRate = (complianceRisk / (complianceRisk + nonComplianceRisk)) * 100;

  
  const earliestTransactionDate = new Date(txnSummaryData[0].earliest_transaction.block_signed_at);
  const ageOfWalletInMilliseconds = currentDate - earliestTransactionDate;
  const ageOfWallet = Math.floor(ageOfWalletInMilliseconds / (1000 * 60 * 60 * 24));
  const totalApprovals = approvalDates.length;
  
  const sumOfApprovalAges = approvalDates.reduce((acc, date) => acc + ((currentDate - date) / (1000 * 60 * 60 * 24)), 0);
  const averageApprovalAge = sumOfApprovalAges / totalApprovals;
  
  const approvalExposure = (averageApprovalAge / ageOfWallet) * 100;
    
  const visitedProtocols = tokenItem.spenders.filter(spender =>
    Protocol.some(protocol => protocol.address.toLowerCase() === spender.spender_address.toLowerCase())
  );
  
  const knownProtocolsCount = visitedProtocols.filter(spender =>
    Protocol.some(protocol => protocol.address.toLowerCase() === spender.spender_address.toLowerCase())
  ).length;
  
  
  const totalVisitedProtocols = visitedProtocols.length;
  
  // Calculate the percentage of known and unknown protocols
  const protocolRiskRate = (1 -(knownProtocolsCount / totalVisitedProtocols)) * 100;
  // Replace protocolRiskRate with a fallback to 0 if it's NaN or undefined
  const displayProtocolRiskRate = isNaN(protocolRiskRate) || !isFinite(protocolRiskRate) ? 0 : protocolRiskRate.toFixed(2);

  const unlimitedApprovalPercentage = calculateUnlimitedApprovalPercentage(
    unlimitedApprovals,
    tokenItem.spenders.length
  );

  const portfolioRisk = calculatePortfolioRisk(
    openApprovalRate,
    approvalExposure,
    protocolRiskRate,
    complianceRiskRate,
    unlimitedApprovalPercentage
  );

  // Replace portfolioRisk with a fallback to 0 if it's NaN or undefined
  const displayPortfolioRisk = isNaN(portfolioRisk) || !isFinite(portfolioRisk) ? 0 : portfolioRisk;

  const approvalIndex = calculateApprovalIndex(
    lowRiskApprovals,
    mediumRiskApprovals,
    highRiskApprovals,
    blacklistedApprovals
  );

  // Define a constant for the approval index
  const APPROVAL_INDEX = !isNaN(approvalIndex) ? (approvalIndex * displayPortfolioRisk).toFixed(2) : 0;

  return (
    <div className='centered-container'>
      <div className='risk-container'>
        <div className='risk-row'>
          <div style={{ color: '#3f8ef6' }}>Number of Open Token Approvals:</div>
          <div style={{ color: 'lightblue' }}>{tokenItem.spenders.length}</div>
        </div>
        <div className='risk-row'>
          <div style={{ color: '#3f8ef6' }}>Number of Open NFT Approvals:</div>
          <div style={{ color: 'lightblue' }}>{nftApprovals}</div>
        </div>
        <div className='risk-row'>
          <div style={{ color: '#3f8ef6' }}>Age of Wallet:</div>
          <div style={{ color: 'lightblue' }}>{ageOfWallet}+ days</div>
        </div>
        <div className='risk-row'>
          <div style={{ color: '#3f8ef6' }}>Oldest Open Approval:</div>
          <div style={{ color: 'lightblue' }}>{daysDifference} days</div>
        </div>
        <div className='risk-row'>
          <div style={{ color: '#3f8ef6' }}>Number of Low Risk Open Approvals:</div>
          <div style={{ color: 'lightblue' }}>{lowRiskApprovals}</div>
        </div>
        <div className='risk-row'>
          <div style={{ color: '#3f8ef6' }}>Number of Medium Risk Open Approvals:</div>
          <div style={{ color: 'lightblue' }}>{mediumRiskApprovals}</div>
        </div>
        <div className='risk-row'>
          <div style={{ color: '#3f8ef6' }}>Number of High Risk Open Approvals:</div>
          <div style={{ color: 'lightblue' }}>{highRiskApprovals}</div>
        </div>
        <div className='risk-row'>
          <div style={{ color: '#3f8ef6' }}>Number of Blacklisted Approvals:</div>
          <div style={{ color: 'lightblue' }}>{blacklistedApprovals}</div>
        </div>
        <div className='risk-row'>
          <div style={{ color: '#3f8ef6' }}>Open Approvals with Unlimited Allowance:</div>
          <div style={{ color: 'lightblue' }}>{unlimitedApprovals}</div>
        </div>
        <div className='risk-row'>
          <div style={{ color: '#3f8ef6' }}>Transaction Approval Rate</div>
          <div style={{ color: 'lightblue' }}>{openApprovalRate.toFixed(2)}%</div>
        </div>
        <div className='risk-row'>
          <div style={{ color: '#3f8ef6' }}>Approval Exposure Rate</div>
          <div style={{ color: 'lightblue' }}>{approvalExposure.toFixed(2)}%</div>
        </div>
        <div className='risk-row'>
          <div style={{ color: '#3f8ef6' }}>Protocol Exposure Risk Rate</div>
          <div style={{ color: 'lightblue' }}>{displayProtocolRiskRate.toFixed(2)}%</div>
        </div>
        <div className='risk-row'>
          <div style={{ color: '#3f8ef6' }}>Compliance Risk Rate</div>
          <div style={{ color: 'lightblue' }}>{complianceRiskRate.toFixed(2)}%</div>
        </div>
        <div className='risk-row'>
          <div style={{ color: '#3f8ef6' }}>Portfolio Exposure Risk</div>
          <div style={{ color: 'lightblue' }}>{displayPortfolioRisk.toFixed(2)}%</div>
        </div>
        <p style={{  color: "lightblue" }}>Based on the values approved, 
        the results above, and some analysis behind the scenes, your wallets overall risk factor is listed below, with the lower your risk factor the better.
        </p>
        <div className='risk-row'>
          <div style={{ color: '#3f8ef6' }}>Wallet Risk Factor</div>
          <div style={{ color: 'lightblue' }}>{APPROVAL_INDEX}%</div>
        </div>
      </div>
    </div>
  );
  
};

export default Risk;
