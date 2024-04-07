import React, { useState, useContext } from "react";
import "./DefaultCoin.css";
import defaultskin from "./photo_2024-03-28_23-01-05-transformed.png";
import dogskin from "./dog.png";
import legendaryskin from "./photo_2024-03-17_19-41-14-removebg-preview.png";
import UserContext from "../../context/UserContext";

const DefaultCoin = () => {
  const [isPressed, setIsPressed] = useState(false);
  const { contextData } = useContext(UserContext);
  const { setFiveHundred, setHundred } = contextData;

  let coinImageSource = defaultskin;
  const legendarySkin = localStorage.getItem("selectedSkin") === "legendary";
      const dogSkin = localStorage.getItem("selectedSkin") === "dog";

  if (legendarySkin) {
    coinImageSource = legendaryskin;
  } else if (dogSkin) {
    coinImageSource = dogskin;
  }

  const handleCoinClick = (event) => {
    if (localStorage.getItem("bust") === "true") {
      setFiveHundred(true);
    } else {
      setHundred(true);
    }
  
    for (let i = 0; i < 5; i++) {
      const smallCoin = document.createElement("img");

      smallCoin.src = coinImageSource;
      smallCoin.className = "small-coin";
      smallCoin.style.left = `${event.clientX}px`;
      smallCoin.style.top = `${event.clientY}px`;
      smallCoin.style.transform =
        "translate(-50%, -50%) scale(0.8, 0.1) rotate(-45deg)"; // Установка начальной трансформации
      document.body.appendChild(smallCoin);

      setTimeout(() => {
        smallCoin.style.animation = "fly-up 1s forwards";
        setTimeout(() => smallCoin.remove(), 2000);
      }, 0);
    }

    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 50);
  };

  

  return (
    <div
      className={`coin ${isPressed ? "pressed" : ""}`}
      onClick={handleCoinClick}
    >
      <img src={coinImageSource} alt="coin" className="coin-image" />
    </div>
  );
};

export default DefaultCoin;
