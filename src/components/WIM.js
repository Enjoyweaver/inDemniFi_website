import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import "../WIM.css";

function WIMWalletCreation() {
  const [wallet, setWallet] = useState(null);
  const [balance, setBalance] = useState(null);
  const [provider, setProvider] = useState(null);
  const [showInfoPopup, setShowInfoPopup] = useState(false);
  const [showSeedPhrase, setShowSeedPhrase] = useState(false);
  const [seedPhraseConfirmed, setSeedPhraseConfirmed] = useState(false);
  const [userInputSeedPhrase, setUserInputSeedPhrase] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [hasStoredWallet, setHasStoredWallet] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [isWalletReady, setIsWalletReady] = useState(false);
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [isNewWallet, setIsNewWallet] = useState(false);

  // On component mount, check for stored wallet
  useEffect(() => {
    const encryptedWallet = localStorage.getItem("indemnifiWallet");
    if (encryptedWallet) {
      setHasStoredWallet(true);
      setWallet(null);
      setIsWalletReady(false);
      setShowSeedPhrase(false);
      setIsNewWallet(false); // Ensure it's false when wallet exists
      // Do not reset seedPhraseConfirmed here
    } else {
      setHasStoredWallet(false);
      setWallet(null);
      setIsWalletReady(false);
      setSeedPhraseConfirmed(false);
      setShowSeedPhrase(false);
      setIsNewWallet(false);
    }
  }, []);

  const createWallet = () => {
    const randomWallet = ethers.Wallet.createRandom();
    setWallet(randomWallet);
    setShowSeedPhrase(true);
    setIsNewWallet(true); // Added this line

    // Connect to the Goerli test network using the default provider
    const provider = ethers.getDefaultProvider("goerli");
    setProvider(provider);
  };

  const confirmSeedPhrase = () => {
    const inputPhrase = userInputSeedPhrase.join(" ").trim();
    if (inputPhrase === wallet.mnemonic.phrase) {
      setSeedPhraseConfirmed(true);
      setErrorMessage("");
    } else {
      setErrorMessage(
        "The seed phrase you entered does not match. Please try again."
      );
    }
  };

  const encryptAndStoreWallet = async () => {
    if (!password) {
      setErrorMessage("Please enter a password.");
      return;
    }
    try {
      const encryptedJson = await wallet.encrypt(password);
      localStorage.setItem("indemnifiWallet", encryptedJson);
      setPassword("");
      setIsWalletReady(true);
      alert("Your wallet has been securely stored.");
    } catch (error) {
      setErrorMessage("Failed to encrypt and store the wallet.");
    }
  };

  const unlockWallet = async () => {
    const encryptedWallet = localStorage.getItem("indemnifiWallet");
    if (!encryptedWallet || !password) {
      setErrorMessage("Please enter your password.");
      return;
    }
    setIsUnlocking(true);
    try {
      const decryptedWallet = await ethers.Wallet.fromEncryptedJson(
        encryptedWallet,
        password
      );
      setWallet(decryptedWallet);
      setPassword("");
      setErrorMessage("");
      setIsWalletReady(true);
      setIsNewWallet(false); // Added this line
      setSeedPhraseConfirmed(true); // Added this line

      // Connect to the Goerli test network using the default provider
      const provider = ethers.getDefaultProvider("goerli");
      setProvider(provider);
    } catch (error) {
      setErrorMessage("Incorrect password. Please try again.");
    }
    setIsUnlocking(false);
  };

  const importWalletFromSeed = () => {
    const mnemonic = prompt("Enter your seed phrase:");
    if (!mnemonic) return;
    try {
      const importedWallet = ethers.Wallet.fromMnemonic(mnemonic.trim());
      setWallet(importedWallet);
      setSeedPhraseConfirmed(true);
      setIsWalletReady(true);
      setIsNewWallet(false); // Added this line

      // Connect to the Goerli test network using the default provider
      const provider = ethers.getDefaultProvider("goerli");
      setProvider(provider);
    } catch (error) {
      alert("Failed to import wallet: " + error.message);
    }
  };

  const importWalletFromPrivateKey = () => {
    const privateKey = prompt("Enter your private key:");
    if (!privateKey) return;
    try {
      const importedWallet = new ethers.Wallet(privateKey.trim());
      setWallet(importedWallet);
      setSeedPhraseConfirmed(true);
      setIsWalletReady(true);
      setIsNewWallet(false); // Added this line

      // Connect to the Goerli test network using the default provider
      const provider = ethers.getDefaultProvider("goerli");
      setProvider(provider);
    } catch (error) {
      alert("Failed to import wallet: " + error.message);
    }
  };

  const connectToProvider = async () => {
    if (!wallet || !provider) return;
    const connectedWallet = wallet.connect(provider);
    try {
      const balance = await connectedWallet.getBalance();
      setBalance(ethers.utils.formatEther(balance));
    } catch (error) {
      alert("Failed to connect to provider: " + error.message);
    }
  };

  const handleSendTransaction = async () => {
    if (!wallet || !provider) return;

    const connectedWallet = wallet.connect(provider);
    const recipient = prompt("Enter the recipient address:");
    const amount = prompt("Enter the amount to send (in ETH):");

    if (!recipient || !amount) return;

    try {
      const tx = await connectedWallet.sendTransaction({
        to: recipient,
        value: ethers.utils.parseEther(amount),
      });
      await tx.wait();
      alert("Transaction successful!");
      connectToProvider(); // Update the balance
    } catch (error) {
      alert("Transaction failed: " + error.message);
    }
  };

  return (
    <div className="wim-wallet-creation-container">
      <h1>inDemniFi Wallet Insurance Model (WIM)</h1>
      <p>
        Traditional crypto wallets often take a small percentage of each swap
        transaction as pure profit. At inDemniFi, we believe this transaction
        fee can be better utilized to benefit users.
      </p>
      <p>
        The inDemniFi Wallet Insurance Model (WIM) redirects these transaction
        fees into a communal insurance pool that automatically grows based on
        your transactions and those of all users who adopt the new inDemniFi
        wallet. Policy limits are dynamic and adjust according to individual
        on-chain risk assessments, compared against the wider user base.
      </p>
      <p>
        By using the inDemniFi wallet, you're not only securing your assets but
        also contributing to a system that rewards safe practices and provides a
        safety net for the community.
      </p>

      <h2>Key Features:</h2>
      <ul>
        <li>
          <strong>Insurance Pool Growth</strong>: Transaction fees contribute to
          an insurance pool that grows with user activity.
        </li>
        <li>
          <strong>Dynamic Policy Limits</strong>: Coverage adjusts based on
          individual risk profiles and overall user base risk assessment.
        </li>
        <li>
          <strong>Community-Oriented</strong>: A collective approach to security
          that benefits all users.
        </li>
        <li>
          <strong>Exclusive Integration</strong>: The WIM is exclusively
          available through the inDemniFi wallet.
        </li>
      </ul>

      <h2>Create Your Wallet</h2>
      <p>
        Generate a new wallet address to start using the inDemniFi Wallet
        Insurance Model (WIM).
      </p>
      <p className="create-wallet-button">
        But dont transfer funds to this wallet as it is in beta testing /
        building and a work-in-progress, but you are welcome to create a wallet
        and help us test this out and give us feedback.
      </p>

      {/* Unlock Wallet */}
      {hasStoredWallet && !wallet && (
        <div className="unlock-wallet-container">
          <h3>Unlock Your Wallet</h3>
          <p>Please enter your password to unlock your wallet.</p>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button
            className="confirm-button"
            onClick={unlockWallet}
            disabled={isUnlocking}
          >
            {isUnlocking ? "Unlocking..." : "Unlock Wallet"}
          </button>
        </div>
      )}

      {/* Initial Options */}
      {!hasStoredWallet && !wallet && !showSeedPhrase && (
        <div className="initial-options">
          <button
            className="create-wallet-button"
            onClick={() => setShowInfoPopup(true)}
          >
            Create New Wallet
          </button>
          <button
            className="import-wallet-button"
            onClick={importWalletFromSeed}
          >
            Import Wallet with Seed Phrase
          </button>
          <button
            className="import-wallet-button"
            onClick={importWalletFromPrivateKey}
          >
            Import Wallet with Private Key
          </button>
        </div>
      )}

      {/* Info Popup */}
      {showInfoPopup && (
        <div className="info-popup">
          <h3>Important Information</h3>
          <p>
            You are about to create a new wallet. Upon creation, you will be
            presented with a 12-word seed phrase. This seed phrase is the{" "}
            <strong>only way</strong> to recover your wallet if you lose access.
            It will only be displayed <strong>once</strong>.
          </p>
          <p>
            Please write down your seed phrase and store it securely. Never
            share it with anyone.
          </p>
          <p>
            After viewing your seed phrase, you will be asked to input it again
            to confirm that you've written it down.
          </p>
          <button className="confirm-button" onClick={createWallet}>
            I Understand
          </button>
        </div>
      )}

      {/* Seed Phrase Display */}
      {showSeedPhrase && !seedPhraseConfirmed && (
        <div className="seed-phrase-container">
          <h3>Your Seed Phrase</h3>
          <p className="seed-phrase">{wallet.mnemonic.phrase}</p>
          <p>
            Please write down your seed phrase exactly as shown. It will not be
            displayed again.
          </p>
          <button
            className="confirm-button"
            onClick={() => {
              setShowSeedPhrase(false);
            }}
          >
            I Have Written It Down
          </button>
        </div>
      )}

      {/* Seed Phrase Confirmation */}
      {isNewWallet && !seedPhraseConfirmed && !showSeedPhrase && wallet && (
        <div className="seed-phrase-confirmation">
          <h3>Confirm Your Seed Phrase</h3>
          <p>Please enter each word of your seed phrase in the boxes below.</p>
          <div className="seed-phrase-inputs">
            {wallet.mnemonic.phrase.split(" ").map((_, index) => (
              <input
                key={index}
                type="text"
                className="seed-word-input"
                maxLength={15} // Adjust length as needed
                value={userInputSeedPhrase[index] || ""}
                onChange={(e) => {
                  const newInput = [...userInputSeedPhrase];
                  newInput[index] = e.target.value;
                  setUserInputSeedPhrase(newInput);
                }}
              />
            ))}
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button className="confirm-button" onClick={confirmSeedPhrase}>
            Confirm Seed Phrase
          </button>
        </div>
      )}

      {/* Set Password */}
      {seedPhraseConfirmed && !isWalletReady && (
        <div className="password-container">
          <h3>Set a Password to Secure Your Wallet</h3>
          <p>
            Please set a password to encrypt and securely store your wallet on
            this device.
          </p>
          <input
            type="password"
            placeholder="Enter a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button className="confirm-button" onClick={encryptAndStoreWallet}>
            Secure Wallet
          </button>
        </div>
      )}

      {/* Wallet Details and Actions */}
      {isWalletReady && wallet && (
        <div className="wallet-details">
          <h2>Your Wallet Details</h2>
          <p>
            <strong>Address:</strong> {wallet.address}
          </p>
          <button
            className="toggle-private-key-button"
            onClick={() => setShowPrivateKey(!showPrivateKey)}
          >
            {showPrivateKey ? "Hide Private Key" : "Show Private Key"}
          </button>
          {showPrivateKey && (
            <p>
              <strong>Private Key:</strong> {wallet.privateKey}
            </p>
          )}
          <p>
            <em>
              Note: Keep your private key secure. Do not share it with anyone.
            </em>
          </p>
          <div className="wallet-actions">
            <button
              className="connect-wallet-button"
              onClick={connectToProvider}
            >
              Connect to Provider
            </button>
            {balance !== null && (
              <p className="wallet-balance">Balance: {balance} ETH</p>
            )}
            <button
              className="send-transaction-button"
              onClick={handleSendTransaction}
            >
              Send Transaction
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default WIMWalletCreation;
