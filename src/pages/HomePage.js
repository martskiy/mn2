import React, { useState, useContext, useEffect } from "react";
import axios from 'axios';
import "./HomePage.css";
import DefaultCoin from "../components/DefaultCoin/DefaultCoin";
import MainButton from "../components/MainButton/MainButton";
import UserContext from "../context/UserContext";

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
  const [balance2, setBalance2] = useState(null);

  const currentTime = new Date().getTime();

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
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://empty-pears-change.loca.lt/api/get/?user_id=12345"
        );
        console.log('Response from server:', response.data);
        setBalance2(response.data.balance);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };
  
    fetchData();

    if (autoBot && currentTime - lastActivity >= 2 * 1000 && lastActivity) {
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
      <div className="top-section">{balance2}</div>
      <div className={`top-section2 ${showDream ? "show" : ""}`}>
        {showDream && dream.toFixed(5)}
      </div>
      <div className="middle-section">{changeBalance.toFixed(5)}</div>
      <div className="third-section">
        <DefaultCoin />
      </div>
      <div className="bottom-section">
        <MainButton />
      </div>
    </div>
  );
};

export default HomePage;
