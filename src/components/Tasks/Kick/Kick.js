import React, { useContext, useState } from "react";
import "./Kick.css";
import kickLogo from "./Kick_logo.svg.png";
import UserContext from "../../../context/UserContext";

const Kick = () => {
  const { contextData } = useContext(UserContext);
  const { balance, setBalance } = contextData;

  const [clicked, setClicked] = useState(localStorage.getItem('clickedKick') === 'true');

  const handleClick = () => {
    if (!clicked) {
      setBalance(balance + 2.00);
      localStorage.setItem('clickedKick', 'true');
      setTimeout(() => {
        setClicked(true);
        
      }, 10000); // 10 секунд задержки
    }
  };

  return (
    <div className={` ${clicked ? 'disabled' : ''}`} onClick={handleClick}>
      {clicked ? (
        <div className="checked-icon-kick">2.00 MELL получено &#10003;</div>
      ) : (
        <a href="https://kick.com/mellstroy271" className="kick-skin-container">
          <img src={kickLogo} alt="Dog Skin" className="kick-skin-image" />
          <div className="kick-skin-info">
            <p className="kick-skin-name">Подпишись на Kick MELSTROY</p>
            <p className="kick-skin-price">2.00 MELL</p>
          </div>
        </a>
      )}
    </div>
  );
};

export default Kick;
