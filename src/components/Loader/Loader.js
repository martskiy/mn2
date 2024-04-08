import React, { useState, useEffect } from "react";
import "./Loader.css";

const Loader = ({ visible }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    let intervalID;
    if (visible) {
      intervalID = setInterval(() => {
        setLoadingProgress((prevProgress) => prevProgress + 1);
      }, 10); // Измените интервал, чтобы соответствовать вашим требованиям
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
