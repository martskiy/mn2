import React, { useState, useContext, useEffect } from "react";
import "./HomePage.css";
import DefaultCoin from "../components/DefaultCoin/DefaultCoin";
import MainButton from "../components/MainButton/MainButton";
import UserContext from "../context/UserContext";
// import sendUserDataFromLocalStorage from "../utils/axiosCreate";
import ProgressBar from "../components/ProgressBar/ProgressBar";
import coinimage from "./icons8-dollar-coin-94.png";
import giphy from './fire.gif'

const HomePage = () => {
  const { contextData } = useContext(UserContext);
  const {
    setBalance,
    fiveHundred,
    hundred,
    setHundred,
    setFiveHundred,
    speed,
    autoBot,
    setUserId,
    pageLoaded,
    setPageLoaded,
  } = contextData;
  const [changeBalance, setChangeBalance] = useState(() => {
    const changeBalanceNow = localStorage.getItem("balance");
    return changeBalanceNow ? JSON.parse(changeBalanceNow) : 0;
  });
  const [lastActivity, setLastActivity] = useState(
    parseInt(localStorage.getItem("lastActivity"))
  );

  const [dream, setDream] = useState(0);
  const [autoChangeBalance, setAutoChangeBalance] = useState(0);
  const [showDream, setShowDream] = useState(false);

  const currentTime = new Date().getTime();

  useEffect(() => {
    const platform = navigator.platform.toLowerCase();

    if (platform.includes("win") || platform.includes("mac")) {
      console.log("Open on your mobile device");
      setPageLoaded(true);
    } else {
      setPageLoaded(true);
    }
  }, []);
  if (!pageLoaded) {
    return null;
  }

  useEffect(() => {
    if (
      window.Telegram &&
      window.Telegram.WebApp &&
      window.Telegram.WebApp.initDataUnsafe
    ) {
      const getUserId = window.Telegram.WebApp.initDataUnsafe.user.id;
      let checkId = localStorage.getItem("userId");
      if (!checkId) {
        setUserId(getUserId);
        localStorage.setItem("userId", getUserId);
      }
    }
    if (window.Telegram && window.Telegram.WebApp) {
      if (!pageLoaded) {
        return;
      }
      // sendUserDataFromLocalStorage();
      window.Telegram.WebApp.expand();
    }
  }, [pageLoaded]);

  useEffect(() => {
    let count = 0;
    let intervalID;
    let speedUp = speed ? 10 : 20;

    if (hundred) {
      intervalID = setInterval(() => {
        if (count < 500) {
          setChangeBalance((prevBalance) => prevBalance + 0.000002);
          count++;
        } else {
          clearInterval(intervalID);
          setBalance((prevBalance) => prevBalance + 0.001);
          setHundred(false);
          setLastActivity(currentTime);
          localStorage.setItem("lastActivity", currentTime.toString());
        }
      }, speedUp);
    } else if (fiveHundred) {
      intervalID = setInterval(() => {
        if (count < 500) {
          setChangeBalance((prevBalance) => prevBalance + 0.00001);
          count++;
        } else {
          clearInterval(intervalID);
          setBalance((prevBalance) => prevBalance + 0.005);
          setFiveHundred(false);
          setLastActivity(currentTime);
          localStorage.setItem("lastActivity", currentTime.toString());
        }
      }, speedUp);
    } 

    return () => clearInterval(intervalID);
  }, [fiveHundred, hundred, speed]);

  useEffect(() => {
    let count = 0;
    let intervalID;
    if (autoChangeBalance > 0) {
      intervalID = setInterval(() => {
        if (count < 300) {
          setChangeBalance((prevBalance) => prevBalance + (autoChangeBalance / 300));
          count++;
        } else {
          clearInterval(intervalID);
          setLastActivity(currentTime);
          localStorage.setItem("lastActivity", currentTime.toString());
          setAutoChangeBalance(0)
        }
      }, 10);

    return () => clearInterval(intervalID);
  }}, [autoChangeBalance]);

  useEffect(() => {
    const storedBalance = parseFloat(localStorage.getItem("balance"));
    if (changeBalance == 0) {
      const randomAmount = Math.random() * (18.40501 - 9.01883) + 9.01883;
      let count = 0;
      const intervalID = setInterval(() => {
        if (count < 300) {
          setChangeBalance(prevBalance => prevBalance + randomAmount / 300);
          count++;
        } else {
          clearInterval(intervalID);
          setBalance(randomAmount);
          localStorage.setItem("balance", randomAmount.toString());
        }
        
      }, 10);

      return () => clearInterval(intervalID);
    }
  }, []);

  useEffect(() => {
    if (autoBot && currentTime- lastActivity >= 60 * 60 * 1000 && lastActivity) {
      const amountTime = (currentTime - lastActivity) / 1000;
      setAutoChangeBalance(amountTime * 0.0001)
      setBalance((prevBalance) => prevBalance + amountTime * 0.0001);
      setDream(amountTime * 0.0001);
      setShowDream(true);
      setTimeout(() => setShowDream(false), 3000);
    }
  }, [autoBot, lastActivity]);

  return (
    <div className="container">
      <div className="overlay-block">
        <a href="https://t.me/mellcoinsapp" className="link-style">
          <img src={giphy} alt="Gif Image" className="gif-image" />
        </a>
        <div className="overlay-text">Airdrop</div>
      </div>
      <div className="top-section">
        {hundred || fiveHundred ? (
          <span style={{ color: "#1C1C1F", fontSize: "15px" }}>
            Please wait...
          </span>
        ) : null}
      </div>

      <div className={`top-section2 ${showDream ? "show" : ""}`}>
        {showDream && `+${dream.toFixed(5)}⚒`}
      </div>
      <div className="middle-section">
        <img src={coinimage} alt="Coin" className="coin-icon" />
        <div className="balance">{changeBalance.toFixed(5)}</div>
      </div>

      <div className="third-section">
        <DefaultCoin />
      </div>
      <div className="bottom-section">
        <MainButton />
        {hundred && <ProgressBar duration={speed ? 5000 : 10000} />}
        {fiveHundred && <ProgressBar duration={speed ? 5000 : 10000} />}
      </div>
    </div>
  );
};

export default HomePage;
