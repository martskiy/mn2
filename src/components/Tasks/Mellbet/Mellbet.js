import React from "react";
import "./Mellbet.css";
import mellBet from "./2865fa.png";
import icons8 from "./icons8-dollar-coin-94.png";

const Mellbet = () => {
  return (
    <a
      href="https://melbet-12371.top/ru/promotions/landing-crash?tag=d_852201m_22179c_"
      className="mellbet-skin-container"
    >
      <img src={mellBet} alt="Mellbet Skin" className="mellbet-skin-image" />

      <div className="mellbet-skin-info">
        <p className="mellbet-skin-name">Создай аккаунт на MellBet</p>
        <p className="mellbet-skin-price">
          <>
            <img src={icons8} alt="Icon" className="mellbet-small-image" />
            <span>4.00</span>
          </>
        </p>
      </div>
    </a>
  );
};

export default Mellbet;
