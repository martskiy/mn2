import React, { useContext, useState } from "react";
import "./Public.css";
import telegram from "./Telegram.png";
import UserContext from "../../../context/UserContext";

const Public = () => {
  const { contextData } = useContext(UserContext);
  const { balance, setBalance } = contextData;

  const [clicked, setClicked] = useState(localStorage.getItem('clickedPublic') === 'true');

  const handleClick = () => {
    if (!clicked) {
      setBalance(balance + 1.00);
      localStorage.setItem('clickedPublic', 'true');
      setTimeout(() => {
        setClicked(true);
        
      }, 10000); // 10 секунд задержки
    }
  };

  return (
    <div onClick={handleClick}>
      <a href="https://t.me/mellcoinsapp/489" className="task-skin-container">
        <img src={telegram} alt="Dog Skin" className="task-skin-image" />
        <div className="task-skin-info">
          <p className="task-skin-name">Подпишись на канал MELLCOIN</p>
          <p className="task-skin-price">{clicked ? "получено" : "1.00 MELL"} </p>
        </div>
      </a>
    </div>
  );
  
}
export default Public;
