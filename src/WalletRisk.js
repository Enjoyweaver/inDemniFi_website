import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import "./App.css";
import Body from "./components/Body";
import Footer from "./components/Footer";
import { ethers } from "ethers";
import Transactions from "./components/Transactions";
import TokenBalances from "./components/TokenBalances";
import Api from "./components/approvals/Api";
import ChainSelector from "./components/activity/ChainSelector";
import { transformData } from "./utils/utils";
import WalletSummary from "./components/activity/WalletSummary";
import TokenAllocation from "./components/activity/TokenAllocation";
import Portfolio from "./components/Portfolio";
import whitelistedAddresses from "./components/whitelisted/underwriting";
import ProtocolsVisited from "./components/ProtocolsVisited";
import WalletInteractions from "./components/WalletInteractions";
import ProfitLossAnalysis from "./components/ProfitLossAnalysis";

function App() {
  const [publicKey, setPublicKey] = useState();
  const [inputWallet, setInputWallet] = useState("");
  const [activeWallet, setActiveWallet] = useState("");
  const [network, setNetwork] = useState();
  const [chainId, setChainId] = useState();
  const [msg, setMsg] = useState();
  const [buttonPressed, setButtonPressed] = useState(false);
  const [chains, setChains] = useState([]);
  const [data, setData] = useState(null);
  const [analyzed, setAnalyzed] = useState(false);
  const [txnSummaryData, setTxnSummaryData] = useState(null);
  const [showBody, setShowBody] = useState(true);
  const [currentPage, setCurrentPage] = useState("home");
  const [netWorth, setNetWorth] = useState(0);
  const [apiError, setApiError] = useState(null);

  const handlePageChange = (pageName) => {
    setCurrentPage(pageName);
  };

  const handlePassPublicKey = () => {
    setButtonPressed(true);
    setAnalyzed(true);
    setShowBody(false);
    // Only allow inputting other wallets if the connected wallet is whitelisted
    if (isWhitelisted(publicKey)) {
      setActiveWallet(inputWallet || publicKey);
    } else {
      setActiveWallet(publicKey);
    }
  };

  const apiKey = process.env.REACT_APP_COVALENT_API_KEY;

  const fetchWalletActivity = (wallet) => {
    const walletActivityEndpoint = `https://api.covalenthq.com/v1/labs/activity/${wallet}/`;
    fetch(walletActivityEndpoint, {
      method: "GET",
      headers: {
        Authorization: `Basic ${btoa(apiKey + ":")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.data && res.data.items) {
          const excludeTestnet = res.data.items.filter(
            (item) => !item.is_testnet
          );
          setChains(excludeTestnet);
        }
      })
      .catch((error) => {
        console.error("Error fetching wallet activity:", error);
        setApiError(
          "Unable to fetch wallet activity. Some features may not be available."
        );
      });
  };

  const fetchBalances = (wallet, chainId) => {
    const balancesEndpoint = `https://api.covalenthq.com/v1/${chainId}/address/${wallet}/balances_v2/`;
    fetch(balancesEndpoint, {
      method: "GET",
      headers: {
        Authorization: `Basic ${btoa(apiKey + ":")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.data && res.data.items) {
          const { newData, totalValue } = transformData(res.data.items);
          setData(newData);
          setNetWorth(totalValue);
        }
      })
      .catch((error) => {
        console.error("Error fetching balances:", error);
        setApiError(
          "Unable to fetch balances. Some features may not be available."
        );
      });
  };

  useEffect(() => {
    if (activeWallet && chainId && analyzed) {
      const txnSummaryEndpoint = `https://api.covalenthq.com/v1/${chainId}/address/${activeWallet}/transactions_summary/`;
      fetch(txnSummaryEndpoint, {
        method: "GET",
        headers: {
          Authorization: `Basic ${btoa(apiKey + ":")}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch");
          }
          return res.json();
        })
        .then((res) => {
          setTxnSummaryData(res.data.items);
        })
        .catch((error) => {
          console.error("Error fetching transaction summary:", error);
          setApiError(
            "Unable to fetch transaction summary. Some features may not be available."
          );
        });
    }
  }, [activeWallet, chainId, analyzed, apiKey]);

  const connectButton = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.listAccounts();
        const { name, chainId } = await provider.getNetwork();
        setNetwork(name);
        setChainId(chainId);
        setPublicKey(accounts[0].toLowerCase()); // Convert to lowercase for consistency
      } catch (error) {
        setMsg("Connection request denied. Please try again.");
      }
    } else {
      setMsg("MetaMask is not installed or supported on this device.");
    }
  };

  const handleChainSelect = (chainId) => {
    setChainId(chainId);
  };

  const isWhitelisted = (address) => {
    return whitelistedAddresses.includes(address.toLowerCase());
  };

  useEffect(() => {
    if (activeWallet && analyzed) {
      fetchWalletActivity(activeWallet);
    }
  }, [activeWallet, analyzed]);

  useEffect(() => {
    if (activeWallet && chainId && analyzed) {
      fetchBalances(activeWallet, chainId);
    }
  }, [activeWallet, chainId, analyzed]);

  return (
    <Router>
      <div>
        <Body />
        {!publicKey && (
          <button className="wbtn" onClick={connectButton}>
            Connect Your MetaMask Wallet
          </button>
        )}
        {publicKey && (
          <div className="walletInput">
            <p>Connected Wallet: {publicKey}</p>
            {isWhitelisted(publicKey) ? (
              <>
                <label htmlFor="walletAddress" className="walletLabel">
                  Enter Wallet Address (leave empty to analyze connected
                  wallet):
                </label>
                <input
                  type="text"
                  id="walletAddress"
                  value={inputWallet}
                  onChange={(e) => setInputWallet(e.target.value)}
                />
              </>
            ) : (
              <p>You are not authorized to analyze other wallets.</p>
            )}
            <button onClick={handlePassPublicKey}>Analyze Wallet</button>
          </div>
        )}
        {msg && <p>{msg}</p>}
        {apiError && <p>{apiError}</p>} {/* Display API errors */}
        {analyzed && (
          <div className="walletAddress">
            <p>Analyzing wallet address: {activeWallet}</p>
          </div>
        )}
        {buttonPressed && data && (
          <>
            {/* Navigation Tabs */}
            <div className="pageTabs">
              <NavLink
                exact
                to="/"
                className={({ isActive }) =>
                  isActive ? "pageTabButton active" : "pageTabButton"
                }
              >
                Risk Underwriting
              </NavLink>
              <NavLink
                to="/protocols"
                className={({ isActive }) =>
                  isActive ? "pageTabButton active" : "pageTabButton"
                }
              >
                Protocols Visited
              </NavLink>
              <NavLink
                to="/interactions"
                className={({ isActive }) =>
                  isActive ? "pageTabButton active" : "pageTabButton"
                }
              >
                Wallet Interactions
              </NavLink>
              <NavLink
                to="/profitLoss"
                className={({ isActive }) =>
                  isActive ? "pageTabButton active" : "pageTabButton"
                }
              >
                Profit/Loss Analysis
              </NavLink>
            </div>
            {/* Chain Selector appears on all pages */}
            <ChainSelector
              chains={chains}
              handleChainSelect={handleChainSelect}
            />
            {/* Routes */}
            <Routes>
              <Route
                path="/"
                element={
                  <div className="Transactions">
                    <div className="tokenTitle">Wallet Summary</div>
                    <div className="summary">
                      {netWorth && (
                        <div className="value">${netWorth.toFixed(2)}</div>
                      )}
                      <WalletSummary
                        walletAddress={activeWallet}
                        chainId={chainId}
                        chains={chains}
                        txnSummaryData={txnSummaryData}
                      />
                      <TokenAllocation
                        chainId={chainId}
                        walletAddress={activeWallet}
                        data={data}
                      />
                    </div>
                    <Api
                      publicKey={activeWallet}
                      chainId={chainId}
                      txnSummaryData={txnSummaryData}
                    />
                    <div className="tokenTitle">Historical Transactions</div>
                    <Transactions address={activeWallet} chainId={chainId} />
                    <div className="tokenTitle">Token Balances</div>
                    <TokenBalances address={activeWallet} chainId={chainId} />
                    <div className="tokenTitle">30 Day Token Value</div>
                    <Portfolio publicKey={activeWallet} chainId={chainId} />
                  </div>
                }
              />
              <Route
                path="/protocols"
                element={
                  <ProtocolsVisited
                    walletAddress={activeWallet}
                    chainId={chainId}
                  />
                }
              />
              <Route
                path="/interactions"
                element={
                  <WalletInteractions
                    walletAddress={activeWallet}
                    chainId={chainId}
                  />
                }
              />
              <Route
                path="/profitLoss"
                element={
                  <ProfitLossAnalysis
                    walletAddress={activeWallet}
                    chainId={chainId}
                  />
                }
              />
            </Routes>
          </>
        )}
        <div className="footer">
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
