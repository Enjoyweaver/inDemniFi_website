import React, { Component } from "react";

class Intro extends Component {
  render() {
    const sectionStyle = {
      fontSize: "1.7em",
      textAlign: "center",
      color: "lightblue",
      width: "60vw",
    };

    const sectionItemStyle = {
      marginBottom: "35px",
      paddingBottom: "15px",
      border: "1px solid lightgray",
      borderRadius: "5px",
      backgroundColor: "rgba(166, 166, 166, 0.3)",
      paddingLeft: "25px",
      paddingRight: "25px",
    };

    return (
      <div>
        <section style={sectionStyle}>
          <div>
            <h2 style={{ marginBottom: "-0.3em" }}>Welcome to inDemniFi</h2>
            <h2 style={{ marginTop: "-0.3em" }}>
              {" "}
              a Web3 risk and insurance platform
            </h2>
          </div>

          <p>
            We are currently developing several components, but here are the
            main ones:
          </p>

          <div style={sectionItemStyle}>
            <h3>Wallet Insurance Model SDK</h3>
            <p>
              This software development kit will enable wallet providers to
              offer insurance and risk management services seamlessly by
              integrating insurance coverage into Web3 wallets.
            </p>
          </div>

          <div style={sectionItemStyle}>
            <h3>Auditor Dashboard & Rankings List</h3>
            <p>
              Evaluate Web3 auditors and make informed decisions using our
              Auditor Dashboard.
            </p>
          </div>

          <div style={sectionItemStyle}>
            <h3>State of Cryptocurrency Underwriting</h3>
            <p>
              Stay informed with our comprehensive report on the evolving
              landscape of cryptocurrency underwriting in insurance.
            </p>
          </div>

          <div style={sectionItemStyle}>
            <h3>Wallet Risk Security Tool</h3>
            <p>
              View your historical transactions, your balance history, and
              proactively identify and address potential security
              vulnerabilities by revoking risky open approvals.
            </p>
          </div>

          <div style={sectionItemStyle}>
            <h3>Protocol Perishability Factor</h3>
            <p>
              Understand the longevity and sustainability of Web3 protocols to
              make informed investment choices.
            </p>
          </div>

          <div style={sectionItemStyle}>
            <h3>Risk and Insurance Certifications</h3>
            <p>
              Earn a certification and validate your expertise in the Web3 risk
              and insurance space.
            </p>
          </div>
        </section>
      </div>
    );
  }
}

export default Intro;
