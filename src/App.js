import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Intro from "./components/Intro";
import Footer2 from "./components/Footer2";
import Navbar from "./components/Navbar";
import AuditorRankings from "./components/AuditorRankings";
import SCU from "./components/SCU";
import WalletRisk from "./WalletRisk";
import Technician from "./components/Technician";
import Certifications from "./components/Certifications";
import VyperQuiz from "./components/VyperQuiz";
import WIM from "./components/WIM";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const handlePageChange = (pageName) => {
    setCurrentPage(pageName);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "auditorRankings":
        return <AuditorRankings />;
      case "scu":
        return <SCU />;
      case "walletRisk":
        return <WalletRisk />;
      case "Technician":
        return <Technician />;
      case "Certifications":
        return <Certifications />;
      case "vyperQuiz":
        return <VyperQuiz />;

      case "wim":
        return <WIM />;
      default:
        return <Intro />;
    }
  };

  const shouldDisplayFooter = currentPage === "home";

  return (
    <div className="App">
      <Header />
      <Navbar onPageChange={handlePageChange} currentPage={currentPage} />
      <div className="wrapper">{renderPage()}</div>
      {shouldDisplayFooter && <Footer2 />}
    </div>
  );
}

export default App;
