import React from "react";
import "./Desktop.css"; 
import qrcode from "./IMG_5556.PNG"

const HomePage = () => {
  return (
    <div className="container">
      <div className="text">Use your mobile device</div>
      <div className="image-container">
        <img
          src={qrcode}
          alt="Placeholder"
          className="image"
        />
      </div>
    </div>
  );
};

export default HomePage;
