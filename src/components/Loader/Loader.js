import React, { useState, useEffect, useContext } from 'react';
import './Loader.css'; 
import  UserContext  from '../../context/UserContext'; 

const Loader = () => {
  const { speed, hundred, fiveHundred } = useContext(UserContext); 

  const [progress, setProgress] = useState(100); 

  useEffect(() => {
    const loadingTime = speed ? 5 : 10; 

    const interval = setInterval(() => {
      setProgress(prevProgress => {
        return prevProgress - (1 / loadingTime) * 100;
      });
    }, 1000);

    return () => clearInterval(interval); 
  }, [speed, hundred, fiveHundred]); // Добавляем isPressed в массив зависимостей

  useEffect(() => {
    if (fiveHundred || hundred) {
      const loadingTime = speed ? 5 : 10; 

      const timeout = setTimeout(() => {
        setProgress(0);
      }, loadingTime * 1000);
      return () => clearTimeout(timeout); 
    }
  }, [hundred, fiveHundred, speed]);

  return (
    <div className="loader-container">
      <div className="loader" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default Loader;
