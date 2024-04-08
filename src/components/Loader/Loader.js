import React, { useState, useEffect, useContext } from 'react';
import './Loader.css'; // Стили для Loader
import UserContext from "../../context/UserContext";

const Loader = ({ duration = 10000 }) => {
  const { fiveHundred, hundred } = useContext(UserContext)
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const startTime = Date.now();
    const timers = fiveHundred ? 0.5 : 1
    const endTime = startTime + duration * timers;

    const intervalId = setInterval(() => {
      const now = Date.now();
      const elapsed = now - startTime;
      const remaining = Math.max(0, endTime - now);
      const progress = (remaining / duration) * 100;
      setProgress(progress);

      if (elapsed >= duration) {
        clearInterval(intervalId);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, [duration, fiveHundred, hundred]);

  return (
    <div className="loader-container">
      <div className="loader" style={{ width: `${progress}%` }} />
    </div>
  );
};

export default Loader;
