import React, { useState, useEffect, useContext } from "react";
import "./Loader.css";
import UserContext from "../../context/UserContext";

const Loader = ({ visible }) => {
  const { speed } = useContext(UserContext);
  const [loadingProgress, setLoadingProgress] = useState(100);

  useEffect(() => {
    let intervalID;

    // Устанавливаем интервал в зависимости от значения speed
    const intervalDuration = speed ? 5000 : 10000;

    if (visible) {
      intervalID = setInterval(() => {
        setLoadingProgress((prevProgress) => {
          // Обратная загрузка: уменьшаем прогресс
          if (prevProgress > 0) {
            return prevProgress - 1;
          } else {
            clearInterval(intervalID);
            return 0;
          }
        });
      }, intervalDuration / 100); // Интервал обновления прогресса
    } else {
      setLoadingProgress(0); // Сброс прогресса загрузки
      clearInterval(intervalID); // Остановка интервала
    }

    return () => clearInterval(intervalID); // Очистка интервала при размонтировании компонента
  }, [visible, speed]);

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
