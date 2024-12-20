This is inDemniFi's wallet risk analysis tool that is free to the public to use.

# Checklist and Steps for Converting Covalent API Reliance to Ethers.js

## 1. Identify and Map Dependencies

- [ ] Review all files in the repo that rely on Covalent API endpoints.
- [ ] Identify each Covalent API call and determine the equivalent functionality using ethers.js. Focus on fetching:
  - Wallet activity (transactions, balances, etc.)
  - Token balances
  - Transaction summaries

## 2. Create File Structure for Metadata and Protocol Information

- [ ] Create a dedicated folder for protocol and token metadata:

src/
│
├── data/
│ ├── protocols.json # Protocol addresses and metadata
│ ├── tokens.json # Token contract addresses and metadata
│ ├── chains.json # Chain information (optional)
│
├── utils/
│ ├── metadataUtils.js # Helper functions for fetching metadata
│ ├── ethersUtils.js # Helper functions for ethers.js interactions

## 3. Replace Covalent API Calls

### Wallet Activity and Transaction Summaries

- [ ] Replace `fetchWalletActivity` in `WalletRisk.js`:
- Use `ethers.providers.getHistory(address)` to fetch transaction history.
- Filter and categorize transactions using a mapping from `protocols.json`.
- [ ] Replace transaction summary logic:
- Fetch and aggregate transactions using ethers.js.
- Augment transaction data with protocol metadata from `protocols.json`.

### Token Balances

- [ ] Replace `fetchBalances` in `WalletRisk.js` and `TokenBalances.js`:
- Use `ethers.Contract` with a standard ERC-20 ABI to fetch token balances for known tokens in `tokens.json`.
- Iterate over token addresses and retrieve balances using ethers.js.
- For NFTs, use ERC-721 or ERC-1155 ABIs as needed.

### Transactions

- [ ] Replace `fetchData` in `Transactions.js`:
- Use `ethers.providers.getHistory(address)` to fetch transaction data.
- Categorize transactions by mapping contract addresses to metadata in `protocols.json`.

## 4. Update Utility Functions

- [ ] Modify `transformData` in `utils/utils.js`:
- Refactor to process raw blockchain data fetched using ethers.js.
- Include metadata enrichment from `protocols.json` and `tokens.json`.
- [ ] Update `categorizeTransaction` in `utils/categorize.js`:
- Adapt to work with ethers.js transaction objects.
- Use mappings from `protocols.json` to identify and label transactions.

## 5. Replace API Error Handling

- [ ] Remove error handling specific to Covalent API (e.g., `res.ok` or `res.data.items` checks).
- [ ] Add error handling for ethers.js, such as network errors or failed contract calls.

## 6. Update Network and Explorer Integration

- [ ] Refactor `blockExplorerURLs.js`:
- Retain mappings of chain IDs to block explorers.
- Use ethers.js' `provider.getNetwork()` to dynamically fetch the current chain ID and network.

## 7. Refactor UI Components

### Chain Selector

- [ ] Update `ChainSelector` in `WalletRisk.js` to use ethers.js for chain switching.
- [ ] Reflect the selected chain ID in the application state using ethers.js providers.

### Wallet Interaction

- [ ] Refactor wallet connection logic (`connectButton` in `WalletRisk.js`):
- Ensure correct initialization of ethers.js provider and signer.
- Validate connected wallet addresses using ethers.js.

## 8. Enrich Blockchain Data with Metadata

- [ ] Use `metadataUtils.js` to retrieve protocol and token metadata:
- Match raw blockchain addresses with metadata in `protocols.json` and `tokens.json`.
- Label unknown addresses and log them for future updates.

## 9. Test and Debug

- [ ] Write unit tests for all refactored functions, especially metadata utilities and ethers.js calls.
- [ ] Verify that all blockchain data and enriched metadata match the previous implementation.
- [ ] Test ethers.js integration across multiple wallets and networks.

## 10. Clean Up and Optimize

- [ ] Remove all unused Covalent API dependencies.
- [ ] Optimize ethers.js calls by batching requests where possible.
- [ ] Cache frequently accessed metadata to reduce file I/O.

## 11. Deployment

- [ ] Test the updated app in staging and production environments.
- [ ] Monitor performance and resolve any bugs identified during deployment.
