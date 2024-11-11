import React from "react";

const Footer2 = () => (
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
          fontSize: "20px",
          color: "#808080",
          marginRight: "10px",
          verticalAlign: "middle",
        }}
      >
        Built
      </span>
      <span
        style={{
          fontSize: "20px",
          color: "#808080",
          verticalAlign: "middle",
          marginRight: "10px",
        }}
      >
        by
      </span>
      <span
        style={{ fontSize: "40px", color: "#808080", verticalAlign: "middle" }}
      >
        in<span style={{ color: "#004AAD" }}>De</span>mni
        <span style={{ color: "#004AAD" }}>Fi</span>
      </span>
    </span>
  </footer>
);

export default Footer2;
