import React, { useState, useEffect,useContext } from "react";
import "./Loader.css";
import UserContext from "../../context/UserContext";

const Loader = ({ visible }) => {
  const { speed } = useContext(UserContext);
  const [loadingProgress, setLoadingProgress] = useState(100);

  useEffect(() => {
    let intervalID;
    let speedUp = speed ? 50 : 100;
    if (visible) {
      intervalID = setInterval(() => {
        setLoadingProgress((prevProgress) => prevProgress - 1);
      }, speedUp); // Измените интервал, чтобы соответствовать вашим требованиям
    } else {
      setLoadingProgress(0); // Сброс прогресса загрузки
      clearInterval(intervalID); // Остановка интервала
    }

    return () => clearInterval(intervalID); // Очистка интервала при размонтировании компонента
  }, [visible]);

  return (
    <div className={`loader-container ${visible ? "visible" : ""}`}>
      <div
        className="loader"
        style={{ width: `${loadingProgress}%` }}
      ></div>
    </div>
  );
};

export default Loader;
