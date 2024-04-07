import React, { useContext, useState, useEffect } from 'react';
import './EachHour.css';
import UserContext from '../../../context/UserContext';

const EachHour = () => {
  const { contextData } = useContext(UserContext);
  const { setBalance, bonus, setBonus } = contextData;

  const [timerString, setTimerString] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      if (bonus) {
        const currentTime = Math.floor(Date.now() / 1000); // Текущее время в секундах
        const lastClaimTime = parseInt(localStorage.getItem('lastClaimTime'), 10); // Время последнего нажатия кнопки
        const elapsedTime = currentTime - lastClaimTime; // Прошедшее время с последнего нажатия

        if (elapsedTime <= 3 * 60 * 60) {
          const remainingTime = 3 * 60 * 60 - elapsedTime;
          const hours = Math.floor(remainingTime / 3600);
          const minutes = Math.floor((remainingTime % 3600) / 60);
          const seconds = remainingTime % 60;
          setTimerString(`${hours}h ${minutes}m ${seconds}s`);
        } else {
          setBonus(false);
          localStorage.setItem('bonus', false);
          setTimerString('0.5 MELLCOINS');
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [bonus]);

  const handleClick = () => {
    if (!bonus) {
      setBalance((prevBalance) => prevBalance + 0.5);
      localStorage.setItem('bonus', true);
      setBonus(true);
      localStorage.setItem('lastClaimTime', Math.floor(Date.now() / 1000)); 
    }
  };

  return (
    <div className={`each-hour-container ${bonus ? 'disabled' : ''}`} onClick={handleClick}>
      <div className="each-hour-info">
        <p className="each-hour-name">{bonus ? 'Ожидайте' : 'Забрать бонус'}</p>
        <p className="each-hour-price">{bonus ? timerString : '0.5 MELLCOINS'}</p>
      </div>
    </div>
  );
};

export default EachHour;
