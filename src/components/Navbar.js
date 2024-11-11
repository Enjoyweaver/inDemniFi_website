import React from "react";
import "../App.css";

const Navbar = ({ onPageChange, currentPage }) => {
  const linkStyle = {
    textDecoration: "none",
    color: "inherit",
    cursor: "pointer",
    marginRight: "20px",
    border: "none",
    background: "none",
  };

  const navbarItems = [
    { page: "home", label: "Home" },
    { page: "scu", label: "State of Crypto Underwriting" },
    { page: "auditorRankings", label: "Auditor Rankings" },
    { page: "walletRisk", label: "Wallet Risk" },
    { page: "Certifications", label: "Certifications" },
    { page: "Technician", label: "Exploit Technicians" },
    { page: "vyperQuiz", label: "Vyper Security Quiz" },
    { page: "wim", label: "Create a wallet" },
  ];

  return (
    <nav className="navbar">
      <ul
        className="navbar-list"
        style={{ listStyleType: "none", display: "flex" }}
      >
        {navbarItems.map(
          (item) =>
            currentPage !== item.page && (
              <li
                className="navbar-item"
                style={{ marginRight: "20px" }}
                key={item.page}
              >
                {item.url ? (
                  // Render external links
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={linkStyle}
                    className="github-link"
                  >
                    {item.label}
                  </a>
                ) : (
                  // Render internal navigation buttons
                  <button
                    style={{
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => onPageChange(item.page)}
                  >
                    {item.label}
                  </button>
                )}
              </li>
            )
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
