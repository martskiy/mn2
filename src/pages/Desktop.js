import React from "react";
import "./Desktop.css"; 
import qrcode from "./IMG_5556.PNG"

const HomePage = () => {
  return (
    <div className="container44">
      <div className="image-container44">
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
