import React, { useContext, useEffect, useState } from 'react';

import './LegendarySkin.css';
import legendaryImage from './photo_2024-03-17_19-41-14-removebg-preview.png';
import UserContext from '../../../context/UserContext'

const LegendarySkin = ({ selected, onSelect }) => {
  const [isSelected, setIsSelected] = useState(selected);

  const { contextData } = useContext(UserContext);
  const {balance, setBalance, setLegendarySkinP, legendarySkinP} = contextData;

  const handleClick = () => {
    if (!legendarySkinP && balance >= 10.0) {
      setBalance(prevBalance => prevBalance - 10.0);
      localStorage.setItem('legendarySkinP', true);
      setLegendarySkinP(true);
      localStorage.setItem('dogSkin', false);
      localStorage.setItem('legendarySkin', true);
      localStorage.setItem('defaultSkin', false);
      onSelect('legendary');
      

    } else if (legendarySkinP) {
      localStorage.setItem('dogSkin', false);
      localStorage.setItem('legendarySkin', true);
      localStorage.setItem('defaultSkin', false);
      localStorage.setItem('skinChoose', '2')
      onSelect('legendary');}

    }

    useEffect(() => {
      const container = document.querySelector('.legendary-skin-container');
      const name = document.querySelector('.legendary-skin-name');
      const price = document.querySelector('.legendary-skin-price'); // Добавлено получение элемента с классом legendary-skin-price
    
      if (container && name && price) {
        if (isSelected) {
          container.style.backgroundColor = 'rgba(56, 51, 51, 0.1)';
          name.textContent = '✅';
          price.style.display = 'none'; // Скрыть элемент с ценой
        } else {
          container.style.backgroundColor = '';
          name.textContent = 'Legendary MAVRO skin';
          price.style.display = 'block'; // Показать элемент с ценой
        }
      }
    }, [isSelected]);
    

  useEffect(() => {
    setIsSelected(selected);
  }, [selected]);
  

  return (
    <div className="legendary-skin-container" onClick={handleClick}>
      <div className="legendary-skin-info">
        <p className="legendary-skin-name">Legendary MAVRO skin</p>
        <p className="legendary-skin-price">10.00 MELLCOINS</p>
      </div>
      <img src={legendaryImage} alt="MAVRO" className="legendary-skin-image" />
    </div>
  );
};

export default LegendarySkin;
