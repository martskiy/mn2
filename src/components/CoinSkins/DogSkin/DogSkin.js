
import React, { useEffect, useState, useContext } from 'react';
import './DogSkin.css';
import dogImage from './dog.png';
import UserContext from '../../../context/UserContext';

const DogSkin = ({ selected, onSelect }) => {
  const [isSelected, setIsSelected] = useState(selected);
  const { contextData } = useContext(UserContext);
  const { dogSkin, dogSkinP, setDogSkin, setDogSkinP, balance, setBalance, setDefaultSkin } = contextData;

  const handleClick = () => {
    if (!dogSkinP && balance >= 25.0) {
      setBalance(prevBalance => prevBalance - 25.0);
      localStorage.setItem('dogSkinP', true);
      setDogSkinP(true);
      onSelect("dog");
    } else if (dogSkinP) {
      onSelect("dog");
    }
  };


  useEffect(() => {
    const container = document.querySelector('.dog-skin-container');
    const name = document.querySelector('.dog-skin-name');
    const price = document.querySelector('.dog-skin-price'); // Добавлено получение элемента с классом dog-skin-price
  
    if (container && name && price) {
      if (isSelected) {
        container.style.backgroundColor = 'rgba(56, 51, 51, 0.1)';
        name.textContent = '✅';
        price.style.display = 'none'; // Скрыть элемент с ценой
      } else {
        container.style.backgroundColor = '';
        name.textContent = 'Exclusive DogHouse Skin';
        price.style.display = 'block'; // Показать элемент с ценой
      }
    }
  }, [isSelected]);

  useEffect(() => {
    setIsSelected(selected);
  }, [selected]);

  return (
    <div className="dog-skin-container" onClick={handleClick}>
      <div className="dog-skin-info">
        <p className="dog-skin-name">Dog Skin</p>
        <p className="dog-skin-price">25.00 MELLCOINS</p>
      </div>
      <img src={dogImage} alt="Dog Skin" className="dog-skin-image" />
    </div>
  );
};

export default DogSkin;
