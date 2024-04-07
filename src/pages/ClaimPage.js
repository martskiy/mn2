import React from "react";
import { Link } from "react-router-dom";
import "./ClaimPage.css";
import coinse from './coinse.jpg'

const ClaimPage = () => {
  return (
    <div className="claim-page-container">
      <div className="claim-back-button">
        <Link to="/" className="claim-back-link">
          &lt; Назад
        </Link>
      </div>
      <div className="claim-center-text">MELLCOINS balance</div>
      <div className="claim-center-text2">35.255114</div>
      <div className="claim-boost-components">
      <img src={coinse} alt="Bottom Icon" />
      </div>
      <div className="claim-skins-heading">Skins</div>
    </div>
  );
};

export default ClaimPage;
