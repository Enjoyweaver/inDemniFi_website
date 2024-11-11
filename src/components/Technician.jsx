import React, { useState, useEffect } from "react";
import truncateEthAddress from "truncate-eth-address";
import Footer2 from "./Footer2";
import videoFile from "../assets/Cert.mp4";

const Technician = () => {
  const [allTokenHolders, setAllTokenHolders] = useState([]);
  const [setTotalTokenHolders] = useState(0);
  const [setContractName] = useState("");
  const [setContractAddress] = useState("");
  const [setContractTickerSymbol] = useState("");
  const [setUpdatedAt] = useState("");

  // Sample object mapping known addresses to their profiles
  const addressProfiles = {
    "0xf4c9a61d56b7645be89eca17ce6bacb3f164b2f1": {
      name: "Exploit Crusher",
      profilePhoto: "logo.png",
      twitter: "https://twitter.com/",
      discord: "",
    },
    "0xKnownAddress2": { name: "Jane Smith", profilePhoto: "profile2.jpg" },
    // Add more known addresses and their profiles as needed
  };

  useEffect(() => {
    // const apiKey = process.env.REACT_APP_COVALENT_API_KEY;
    // const tokenAddress = "0x63f8F23ce0f3648097447622209E95A391c44b00"; // Replace this with the desired token address
    // const chainName = "1"; // Replace this with the desired chain
    // const url = `https://api.covalenthq.com/v1/${chainName}/tokens/${tokenAddress}/token_holders_v2/`;
    // const params = { key: apiKey, "page-number": 0 };
    // const fetchTokenData = async () => {
    //   try {
    //     const response = await fetch(`${url}?${new URLSearchParams(params)}`);
    //     const result = await response.json();
    //    if (result && result.data && result.data.pagination) {
    //       const numPages = Math.ceil(
    //         result.data.pagination.total_count /
    //           result.data.pagination.page_size
    //       );
    //       const holders = result.data.items;
    // If there are more pages, fetch and append their data
    //       if (numPages > 1) {
    //        for (let page = 1; page < numPages; page++) {
    //          params["page-number"] = page;
    //          const nextPageResponse = await fetch(
    //             `${url}?${new URLSearchParams(params)}`
    //           );
    //          const nextPageResult = await nextPageResponse.json();
    //          holders.push(...nextPageResult.data.items);
    //         }
    //       }
    //       setAllTokenHolders(holders);
    //       setTotalTokenHolders(result.data.pagination.total_count);
    //       setContractName(result.data.items[0].contract_name); // Set contract name
    //       setContractAddress(result.data.items[0].contract_address); // Set contract address
    //       setContractTickerSymbol(result.data.items[0].contract_ticker_symbol); // Set contract ticker symbol
    //       setUpdatedAt(result.data.updated_at); // Set updated timestamp
    //     } else {
    //        console.error("No token holders data found:", result);
    //     }
    //    } catch (error) {
    //     console.error("Error fetching token holders data:", error);
    //   }
    // };
    // fetchTokenData();
  }, []);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <section
          style={{
            fontSize: "1.7em",
            textAlign: "center",
            color: "lightblue",
            width: "80vw",
          }}
        >
          {" "}
          <h3>Crypto Exploit Technicians</h3>
          <p>
            Those that earn this distinction will receive this to permanently
            display on-chain and will have their profile listed here.
          </p>
          <video autoPlay loop muted width="840" height="660">
            <source src={videoFile} type="video/mp4" />
          </video>
          <p></p>
          {allTokenHolders.length > 0 ? (
            <div style={{ alignItems: "center" }}>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "20px",
                  justifyContent: "center",
                }}
              >
                {allTokenHolders.map((holder, index) => (
                  <div
                    key={index}
                    style={{
                      border: "1px solid #ccc",
                      padding: "10px",
                      display: "flex",
                      alignItems: "center",
                      width: "70%",
                      marginBottom: "50px",
                      backgroundColor: "rgba(166, 166, 166, 0.3)",
                    }}
                  >
                    {addressProfiles[holder.address] && (
                      <div style={{ flex: "1 0 33%" }}>
                        <img
                          src={addressProfiles[holder.address].profilePhoto}
                          alt="Profile"
                          style={{
                            width: "100%",
                            height: "auto",
                            display: "block",
                            borderRadius: "50%",
                          }}
                        />
                      </div>
                    )}
                    <div style={{ flex: "1 0 66%", paddingLeft: "10px" }}>
                      <p style={{ marginBottom: "20px" }}>
                        <strong>{addressProfiles[holder.address]?.name}</strong>
                      </p>
                      <p style={{ marginBottom: "20px" }}>
                        Role: Lead Exploit Data Technician
                      </p>
                      <p style={{ marginBottom: "20px" }}>
                        Address: {truncateEthAddress(holder.address)}
                      </p>
                      {addressProfiles[holder.address]?.twitter && (
                        <p style={{ marginBottom: "10px" }}>
                          <a
                            href={addressProfiles[holder.address].twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Twitter
                          </a>
                        </p>
                      )}
                      {addressProfiles[holder.address]?.discord && (
                        <p style={{ marginBottom: "0px" }}>
                          <a
                            href={`https://discord.com/channels/${
                              addressProfiles[holder.address].discord
                            }`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Discord
                          </a>
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </section>
      </div>
      <Footer2 />
    </div>
  );
};

export default Technician;
