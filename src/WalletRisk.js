import React, { useState, useEffect } from "react";
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
import AuditorRankings from "./components/AuditorRankings";
import SCU from "./components/SCU";

function App() {
  const [publicKey, setPublicKey] = useState();
  const [network, setNetwork] = useState();
  const [chainId, setChainId] = useState();
  const [msg, setMsg] = useState();
  const [buttonPressed, setButtonPressed] = useState(false);
  const [chains, setChains] = useState([]);
  const [data, setData] = useState(null);
  const [analyzed, setAnalyzed] = useState(false);
  const [txnSummaryData, setTxnSummaryData] = useState(null);
  const [showBody, setShowBody] = useState(true);
  const [currentPage, setCurrentPage] = useState("home"); // 'home' is the default page
  const [netWorth, setNetWorth] = useState(0);
  const handlePageChange = (pageName) => {
    setCurrentPage(pageName);

    let pageContent;

    switch (currentPage) {
      case "auditorRankings":
        pageContent = <AuditorRankings />;
        break;
      case "scu":
        pageContent = <SCU />;
        break;
      default:
        pageContent = <Body />;
    }
  };
  const handlePassPublicKey = () => {
    setButtonPressed(true);
    setAnalyzed(true);
    setShowBody(false);
  };

  const apiKey = process.env.REACT_APP_COVALENT_API_KEY;

  const fetchWalletActivity = (publicKey) => {
    const walletActivityEndpoint = `https://api.covalenthq.com/v1/labs/activity/${publicKey}/`;
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
      });
  };

  const fetchBalances = (publicKey, chainId) => {
    const balancesEndpoint = `https://api.covalenthq.com/v1/${chainId}/address/${publicKey}/balances_v2/`;
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
      });
  };

  useEffect(() => {
    if (publicKey && chainId && analyzed) {
      const txnSummaryEndpoint = `https://api.covalenthq.com/v1/${chainId}/address/${publicKey}/transactions_summary/`;
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
          console.error("Error fetching data:", error);
        });
    }
  }, [publicKey, chainId, analyzed, apiKey]);

  const connectButton = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.listAccounts();
        const { name, chainId } = await provider.getNetwork();
        setNetwork(name);
        setChainId(chainId);
        setPublicKey(accounts[0]);
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

  useEffect(() => {
    if (publicKey && analyzed) {
      fetchWalletActivity(publicKey);
    }
  }, [publicKey, analyzed]);

  useEffect(() => {
    if (publicKey && chainId && analyzed) {
      fetchBalances(publicKey, chainId);
    }
  }, [publicKey, chainId, analyzed]);

  return (
    <div>
      <div>
        <Body />
        {publicKey ? null : (
          <button className="wbtn" onClick={connectButton}>
            Connect Your Metamask Wallet
          </button>
        )}
        {msg && <p>{msg}</p>}

        {publicKey && !analyzed && (
          <button
            className="dbtn"
            onClick={handlePassPublicKey}
            style={{ display: publicKey === null ? "none" : "block" }}
          >
            Analyze Your Wallet
          </button>
        )}
        {buttonPressed && data && (
          <div
            className="walletHeader"
            style={{
              fontSize: "1.7em",
              margin: "15px auto",
              padding: "0px 0px 30px",
              textAlign: "center",
              color: "lightblue",
              width: "60vw",
            }}
          >
            Even though you didn't give any approvals to this wallet risk
            security tool, it is best to disconnect your wallet manually after
            you are done reviewing your data.
            <br />
            <br />
            Any blockchains with value on them will appear below for you to
            select.
          </div>
        )}
        {buttonPressed && publicKey !== null && (
          <div className="Transactions">
            <ChainSelector
              chains={chains}
              handleChainSelect={handleChainSelect}
            />
            <div className="tokenTitle">Wallet Summary</div>
            <div className="summary">
              {netWorth && <div className="value">${netWorth.toFixed(2)}</div>}
              <WalletSummary
                walletAddress={publicKey}
                chainId={chainId}
                chains={chains}
                txnSummaryData={txnSummaryData}
              />
              <TokenAllocation
                chainId={chainId}
                walletAddress={publicKey}
                data={data}
              />
            </div>
            <Api
              publicKey={publicKey}
              chainId={chainId}
              txnSummaryData={txnSummaryData}
            />
            <div className="tokenTitle"> Historical Transactions</div>
            <Transactions address={publicKey} chainId={chainId} />
            <div className="tokenTitle">Token Balances</div>
            <TokenBalances address={publicKey} chainId={chainId} />
            <div className="tokenTitle">30 Day Token Value</div>
            <Portfolio publicKey={publicKey} chainId={chainId} />
          </div>
        )}
        <div className="footer">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;

const transformForRecharts = (rawData) => {
  const transformedData = rawData.reduce((acc, curr) => {
    const singleTokenTimeSeries = curr.holdings.map((holdingsItem) => {
      // Formatting the date string just a little...
      const dateStr = holdingsItem.timestamp.slice(0, 10);
      const date = new Date(dateStr);
      const options = {
        day: "numeric",
        month: "short",
      };
      const formattedDate = date.toLocaleDateString("en-US", options);
      return {
        timestamp: formattedDate,
        [curr.contract_ticker_symbol]: holdingsItem.close.quote,
      };
    });
    const newArr = singleTokenTimeSeries.map((item, i) =>
      Object.assign(item, acc[i])
    );
    return newArr;
  }, []);

  return transformedData;
};
