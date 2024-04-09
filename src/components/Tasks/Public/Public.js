import React, { useContext, useState } from "react";
import "./Public.css";
import telegram from "./Telegram.png";
import UserContext from "../../../context/UserContext";
import icons8 from "./icons8-dollar-coin-94.png";

const Public = () => {
  const { contextData } = useContext(UserContext);
  const { balance, setBalance } = contextData;

  const [clicked, setClicked] = useState(
    localStorage.getItem("clickedPublic") === "true"
  );

  const handleClick = () => {
    if (!clicked) {
      setBalance(balance + 150.0);
      localStorage.setItem("clickedPublic", "true");
      setTimeout(() => {
        setClicked(true);
      }, 1000); // 10 секунд задержки
    }
  };

  return (
    <div className={clicked ? "disabled" : ""} onClick={handleClick}>
      <a href="https://t.me/mellcoinsapp/489" className="task-skin-container">
        <img src={telegram} alt="Dog Skin" className="task-skin-image" />
        <div className="task-skin-info">
          <p className="task-skin-name">Подпишись на канал MELLCOIN</p>
          <p className="task-skin-price">
            {!clicked && (
              <>
                <img src={icons8} alt="Icon" className="task-small-image" />
                <span>1.00</span>
              </>
            )}
            {clicked && "получено"}
          </p>
        </div>
      </a>
    </div>
  );
};

export default Public;
