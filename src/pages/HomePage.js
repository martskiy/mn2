import React, { useState, useContext, useEffect } from "react";
import "./HomePage.css";
import DefaultCoin from "../components/DefaultCoin/DefaultCoin";
import MainButton from "../components/MainButton/MainButton";
import UserContext from "../context/UserContext";
import sendUserDataFromLocalStorage from "../utils/axiosCreate";
import Loader from "../components/Loader/Loader";

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
    userId,
    isPressed,
    setUserId,
    pageLoaded,
    setPageLoaded
  } = contextData;
  const [changeBalance, setChangeBalance] = useState(() => {
    const changeBalanceNow = localStorage.getItem("balance");
    return changeBalanceNow ? JSON.parse(changeBalanceNow) : 0;
  });
  const [lastActivity, setLastActivity] = useState(
    parseInt(localStorage.getItem("lastActivity"))
  );
  
  const [dream, setDream] = useState(0);
  const [showDream, setShowDream] = useState(false);

  const currentTime = new Date().getTime();

  useEffect(() => {
    const platform = navigator.platform.toLowerCase();

    if (
      platform.includes("win") ||
      platform.includes("mac") 
    ) {
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
      const getUserId = window.Telegram.WebApp.initDataUnsafe.user.id;
      // Проверяем, должна ли страница загружаться
      if (!pageLoaded) {
        return; // Возвращаемся без отправки данных на сервер
      }
      sendUserDataFromLocalStorage();
      window.Telegram.WebApp.expand();
    }
  }, [pageLoaded]);

  useEffect(() => {
    let count = 0;
    let intervalID;
    let speedUp = speed ? 50 : 100;

    if (hundred) {
      intervalID = setInterval(() => {
        if (count < 100) {
          setChangeBalance((prevBalance) => prevBalance + 0.00001);
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
        if (count < 100) {
          setChangeBalance((prevBalance) => prevBalance + 0.00005);
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
    if (
      autoBot &&
      currentTime - lastActivity >= 60 * 30 * 1000 &&
      lastActivity
    ) {
      const amountTime = (currentTime - lastActivity) / 1000; // Difference in seconds
      setLastActivity(currentTime);
      localStorage.setItem("lastActivity", currentTime.toString());
      setChangeBalance((prevBalance) => prevBalance + amountTime * 0.0001);
      setBalance((prevBalance) => prevBalance + amountTime * 0.0001);
      setDream(amountTime * 0.0001);
      setShowDream(true);
      setTimeout(() => setShowDream(false), 3000);
    }
  }, [autoBot, lastActivity]);

  return (
    <div className="container">
      <div className="top-section">1212</div>
      <div className={`top-section2 ${showDream ? "show" : ""}`}>
        {showDream && dream.toFixed(5)}
      </div>
      <div className="middle-section">{changeBalance.toFixed(5)}</div>
      <div className="third-section">
        <DefaultCoin />
      </div>
      <div className="bottom-section">
        <MainButton />
        <Loader />
      </div>
    </div>
  );
};

export default HomePage;
