import React, { useState, useEffect, useContext } from 'react';
import './Loader.css'; 
import  UserContext  from '../../context/UserContext'; 

const Loader = () => {
  const { speed, isPressed } = useContext(UserContext); 

  const [progress, setProgress] = useState(100); 

  useEffect(() => {
    const loadingTime = speed ? 5 : 10; 

    const interval = setInterval(() => {
      setProgress(prevProgress => {
        return prevProgress - (1 / loadingTime) * 100;
      });
    }, 1000);

    return () => clearInterval(interval); 
  }, [speed]);

  useEffect(() => {
    if (isPressed) {
      const loadingTime = speed ? 5 : 10; 

      const timeout = setTimeout(() => {
        setProgress(0);
      }, loadingTime * 1000);
      return () => clearTimeout(timeout); 
    }
  }, [isPressed, speed]);

  return (
    <div className="loader-container">
      <div className="loader" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default Loader;
