import React, { useState, useEffect } from "react";
import "./Loader.css";

const Loader = ({ visible }) => {
  const [loadingProgress, setLoadingProgress] = useState(100);

  useEffect(() => {
    let intervalID;

    if (visible) {
      intervalID = setInterval(() => {
        setLoadingProgress((prevProgress) => {
          if (prevProgress > 0) {
            return prevProgress - 1;
          } else {
            clearInterval(intervalID);
            return 0;
          }
        });
      }, 10); // Интервал обновления прогресса загрузки
    } else {
      setLoadingProgress(0); // Сброс прогресса загрузки
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
