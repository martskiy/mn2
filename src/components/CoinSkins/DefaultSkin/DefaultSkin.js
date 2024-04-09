// DefaultSkin.js
import React, { useEffect, useState } from 'react';
import './DefaultSkin.css';
import dogImage from './photo_2024-03-28_23-01-05-transformed.png';
import icons8 from './icons8-dollar-coin-94.png'

const DefaultSkin = ({ selected, onSelect }) => {
  const [isSelected, setIsSelected] = useState(selected);

  const handleClick = () => {
    
    onSelect(1);
  };

  useEffect(() => {
    const container = document.querySelector('.default-skin-container');
    const name = document.querySelector('.default-skin-name');

    if (container && name) {
      if (isSelected) {
        container.style.backgroundColor = 'rgba(56, 51, 51, 0.1)';
        name.innerHTML = `<img src="${icons8}" alt="Icon" class="legendary-small-image" />`;
      } else {
        container.style.backgroundColor = '';
        name.textContent = 'Default MELLCOIN';
      }
    }
  }, [isSelected]);

  useEffect(() => {
    setIsSelected(selected);
  }, [selected]);

  return (
    <div className="default-skin-container" onClick={handleClick}>
      <div className="default-skin-texts">
        <p className="default-skin-name">Default MELLCOIN</p>
      </div>
      <img src={dogImage} alt="Dog Skin" className="default-skin-image" />
    </div>
  );
  
};

export default DefaultSkin;

