import React from "react";
import covalentLogo from "../assets/covalent.png";

const Footer = () => (
  <footer
    style={{
      fontWeight: "bold",
      padding: "10px",
      textAlign: "center",
      whiteSpace: "nowrap",
    }}
  >
    <span style={{ color: "#808080", verticalAlign: "middle" }}>
      <span
        style={{
          fontSize: "1.2em",
          color: "#808080",
          marginRight: "10px",
          verticalAlign: "middle",
        }}
      >
        Built
      </span>
      <span
        style={{
          fontSize: "1.2em",
          color: "#808080",
          verticalAlign: "middle",
          marginRight: "10px",
        }}
      >
        by
      </span>
      <span
        style={{ fontSize: "2.8em", color: "#808080", verticalAlign: "middle" }}
      >
        in<span style={{ color: "#004AAD" }}>De</span>mni
        <span style={{ color: "#004AAD" }}>Fi</span>
      </span>
    </span>
    <a
      href="https://www.covalenthq.com/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src={covalentLogo}
        alt="Covalent Logo"
        style={{ height: "80px", marginLeft: "10px", verticalAlign: "middle" }}
      />
    </a>
  </footer>
);

export default Footer;
