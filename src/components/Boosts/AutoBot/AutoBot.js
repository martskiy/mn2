import React, { useContext, useState } from 'react';
import './AutoBot.css';
import UserContext from '../../../context/UserContext';

const AutoBot = () => {
  const { contextData } = useContext(UserContext);
  const { autoBot, setAutoBot, balance, setBalance } = contextData;
  const [buttonText, setButtonText] = useState('Auto Bot');
  const [buttonText2, setButtonText2] = useState('25.00 MELLCOINS');
  const [buttonColor, setButtonColor] = useState('');

  const handleClick = () => {
    if (balance >= 25.0 && !autoBot) {
      setAutoBot(true);
      localStorage.setItem('autoBot', true);
      setBalance(prevBalance => prevBalance - 25.0);
      
    } else {
      // Change button text and color temporarily
      setButtonText('Недостаточно средств');
      setButtonText2('');
      setButtonColor('black');
      
      // Revert button text and color after 1 second
      setTimeout(() => {
        setButtonText('Auto Bot');
        setButtonText2('25.00 MELLCOINS')
        setButtonColor('');
      }, 1000);
    }
  };

  return (
    <div className="auto-bot-container" onClick={handleClick} style={{ backgroundColor: buttonColor }}>
      <div className="auto-bot-info">
        <p className="auto-bot-name">{buttonText}</p>
        <p className="auto-bot-price">{buttonText2}</p>
      </div>
    </div>
  );
};

export default AutoBot;
