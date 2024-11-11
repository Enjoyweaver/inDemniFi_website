import React from "react";
import "../../App.css";
import {
  safeAddresses,
  blacklistedAddresses,
  complianceList,
  Protocol,
} from "./RiskAddresses";

const calculateUnlimitedApprovalPercentage = (
  unlimitedApprovals,
  totalApprovals
) => {
  if (totalApprovals === 0) return "0.00";
  const percentage = (unlimitedApprovals / totalApprovals) * 100;
  return percentage.toFixed(2) || "0.00";
};

const calculateApprovalIndex = (
  lowRiskApprovals,
  mediumRiskApprovals,
  highRiskApprovals,
  blacklistedApprovals
) => {
  const lowRiskWeight = 0.1;
  const mediumRiskWeight = 0.3;
  const highRiskWeight = 0.95;
  const blacklistedWeight = 1;

  const weightedLowRisk = lowRiskApprovals * lowRiskWeight;
  const weightedMediumRisk = mediumRiskApprovals * mediumRiskWeight;
  const weightedHighRisk = highRiskApprovals * highRiskWeight;
  const weightedBlacklisted = blacklistedApprovals * blacklistedWeight;

  const totalWeightedApprovals =
    weightedLowRisk +
    weightedMediumRisk +
    weightedHighRisk +
    weightedBlacklisted;

  const numberOfRiskLevels = 4;
  const approvalIndex = totalWeightedApprovals / numberOfRiskLevels;

  return approvalIndex.toFixed(2);
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
    unlimitedApprovalWeight: 0.25,
  };

  const weightedOpenApproval = openApprovalRate * weights.openApprovalWeight;
  const weightedApprovalExposure =
    approvalExposure * weights.approvalExposureWeight;
  const weightedProtocolRisk = protocolRiskRate * weights.protocolRiskWeight;
  const weightedComplianceRisk =
    complianceRiskRate * weights.complianceRiskWeight;
  const weightedUnlimitedApproval =
    unlimitedApprovalPercentage * weights.unlimitedApprovalWeight;

  const portfolioRisk =
    weightedOpenApproval +
    weightedApprovalExposure +
    weightedProtocolRisk +
    weightedComplianceRisk +
    weightedUnlimitedApproval;

  return portfolioRisk.toFixed(2);
};

const Risk = ({ tokenItems, txnSummaryData }) => {
  if (!txnSummaryData || !txnSummaryData[0]) {
    return <div>No transaction data available</div>;
  }

  // Flatten spenders from all tokenItems
  const spenders = tokenItems.reduce((acc, tokenItem) => {
    if (tokenItem && tokenItem.spenders && tokenItem.spenders.length > 0) {
      return acc.concat(tokenItem.spenders);
    }
    return acc;
  }, []);

  const transactionCount = txnSummaryData[0]?.total_count || 0;
  const currentDate = new Date();

  // Handle cases where there are no approvals
  const approvalDates = spenders.map(
    (spender) => new Date(spender.block_signed_at)
  );

  const openApprovalRate = transactionCount
    ? (spenders.length / transactionCount) * 100
    : 0;

  let daysDifference = 0;
  if (approvalDates.length > 0) {
    const oldestApprovalDate = new Date(
      Math.min(...approvalDates.map((date) => date.getTime()))
    );
    const difference = currentDate - oldestApprovalDate;
    daysDifference = Math.floor(difference / (1000 * 60 * 60 * 24));
  }

  const ageOfWalletInMilliseconds =
    currentDate -
    new Date(
      txnSummaryData[0]?.earliest_transaction?.block_signed_at || currentDate
    );
  const ageOfWallet = Math.floor(
    ageOfWalletInMilliseconds / (1000 * 60 * 60 * 24)
  );

  const safeApprovals = spenders.filter((spender) =>
    safeAddresses.includes(spender.spender_address.toLowerCase())
  ).length;

  const blacklistedApprovals = spenders.filter((spender) =>
    blacklistedAddresses.includes(spender.spender_address.toLowerCase())
  ).length;

  const unknownAddresses = spenders
    .filter(
      (spender) =>
        !safeAddresses.includes(spender.spender_address.toLowerCase()) &&
        !blacklistedAddresses.includes(spender.spender_address.toLowerCase())
    )
    .map((spender) => spender.spender_address.toLowerCase());

  const lowRiskApprovals = safeApprovals;
  const mediumRiskApprovals = unknownAddresses.length;
  const highRiskApprovals = blacklistedApprovals;

  const unlimitedApprovals = spenders.filter(
    (spender) => spender.allowance === "UNLIMITED"
  ).length;

  const complianceRisk = spenders.filter((spender) =>
    complianceList.includes(spender.spender_address.toLowerCase())
  ).length;

  const nonComplianceRisk = spenders.filter(
    (spender) => !complianceList.includes(spender.spender_address.toLowerCase())
  ).length;

  const complianceRiskRate =
    complianceRisk + nonComplianceRisk
      ? (complianceRisk / (complianceRisk + nonComplianceRisk)) * 100
      : 0;

  const totalApprovals = approvalDates.length;
  const sumOfApprovalAges = approvalDates.reduce(
    (acc, date) => acc + (currentDate - date) / (1000 * 60 * 60 * 24),
    0
  );
  const averageApprovalAge = totalApprovals
    ? sumOfApprovalAges / totalApprovals
    : 0;

  const approvalExposure = ageOfWallet
    ? (averageApprovalAge / ageOfWallet) * 100
    : 0;

  const visitedProtocols = spenders.filter((spender) =>
    Protocol.some(
      (protocol) =>
        protocol.address.toLowerCase() === spender.spender_address.toLowerCase()
    )
  );

  const knownProtocolsCount = visitedProtocols.length;

  const totalVisitedProtocols = visitedProtocols.length;
  const protocolRiskRate = totalVisitedProtocols
    ? (1 - knownProtocolsCount / totalVisitedProtocols) * 100
    : 0;

  const unlimitedApprovalPercentage = totalApprovals
    ? (unlimitedApprovals / totalApprovals) * 100
    : 0;

  const portfolioRisk = calculatePortfolioRisk(
    openApprovalRate,
    approvalExposure,
    protocolRiskRate,
    complianceRiskRate,
    unlimitedApprovalPercentage
  );

  const approvalIndex = calculateApprovalIndex(
    lowRiskApprovals,
    mediumRiskApprovals,
    highRiskApprovals,
    blacklistedApprovals
  );

  const APPROVAL_INDEX = !isNaN(approvalIndex)
    ? (approvalIndex * portfolioRisk).toFixed(2)
    : 0;

  return (
    <div className="centered-container">
      <div className="risk-container">
        <div className="risk-row">
          <div style={{ color: "#3f8ef6" }}>
            Number of Open Token Approvals:
          </div>
          <div style={{ color: "lightblue" }}>{spenders.length}</div>
        </div>
        <div className="risk-row">
          <div style={{ color: "#3f8ef6" }}>Age of Wallet:</div>
          <div style={{ color: "lightblue" }}>{ageOfWallet}+ days</div>
        </div>
        <div className="risk-row">
          <div style={{ color: "#3f8ef6" }}>Oldest Open Approval:</div>
          <div style={{ color: "lightblue" }}>{daysDifference} days</div>
        </div>
        <div className="risk-row">
          <div style={{ color: "#3f8ef6" }}>
            Number of Low Risk Open Approvals:
          </div>
          <div style={{ color: "lightblue" }}>{lowRiskApprovals}</div>
        </div>
        <div className="risk-row">
          <div style={{ color: "#3f8ef6" }}>
            Number of Medium Risk Open Approvals:
          </div>
          <div style={{ color: "lightblue" }}>{mediumRiskApprovals}</div>
        </div>
        <div className="risk-row">
          <div style={{ color: "#3f8ef6" }}>
            Number of High Risk Open Approvals:
          </div>
          <div style={{ color: "lightblue" }}>{highRiskApprovals}</div>
        </div>
        <div className="risk-row">
          <div style={{ color: "#3f8ef6" }}>
            Number of Blacklisted Approvals:
          </div>
          <div style={{ color: "lightblue" }}>{blacklistedApprovals}</div>
        </div>
        <div className="risk-row">
          <div style={{ color: "#3f8ef6" }}>
            Open Approvals with Unlimited Allowance:
          </div>
          <div style={{ color: "lightblue" }}>{unlimitedApprovals}</div>
        </div>
        <div className="risk-row">
          <div style={{ color: "#3f8ef6" }}>Transaction Approval Rate</div>
          <div style={{ color: "lightblue" }}>
            {openApprovalRate.toFixed(2)}%
          </div>
        </div>
        <div className="risk-row">
          <div style={{ color: "#3f8ef6" }}>Approval Exposure Rate</div>
          <div style={{ color: "lightblue" }}>
            {approvalExposure.toFixed(2)}%
          </div>
        </div>
        <div className="risk-row">
          <div style={{ color: "#3f8ef6" }}>Protocol Exposure Risk Rate</div>
          <div style={{ color: "lightblue" }}>
            {protocolRiskRate.toFixed(2)}%
          </div>
        </div>
        <div className="risk-row">
          <div style={{ color: "#3f8ef6" }}>Compliance Risk Rate</div>
          <div style={{ color: "lightblue" }}>
            {complianceRiskRate.toFixed(2)}%
          </div>
        </div>
        <div className="risk-row">
          <div style={{ color: "#3f8ef6" }}>Portfolio Exposure Risk</div>
          <div style={{ color: "lightblue" }}>{portfolioRisk}%</div>
        </div>
        <p style={{ color: "lightblue" }}>
          Based on the values approved, the results above, and some analysis
          behind the scenes, your wallet's overall risk factor is listed below,
          with the lower your risk factor the better.
        </p>
        <div className="risk-row">
          <div style={{ color: "#3f8ef6" }}>Wallet Risk Factor</div>
          <div style={{ color: "lightblue" }}>{APPROVAL_INDEX}%</div>
        </div>
      </div>
    </div>
  );
};

export default Risk;
