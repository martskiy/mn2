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
      }, speedUp);
    } else {
      setLoadingProgress(0); 
      clearInterval(intervalID);
    }

    return () => clearInterval(intervalID);
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
