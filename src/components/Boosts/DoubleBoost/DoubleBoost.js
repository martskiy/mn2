import React, { useContext, useState } from 'react';
import './DoubleBoost.css';
import UserContext from '../../../context/UserContext';


const DoubleBoost = () => {
  const { contextData } = useContext(UserContext);
  const { bust, setBust, balance, setBalance } = contextData;
  const [buttonText, setButtonText] = useState('Double Boost X5');
  const [buttonText2, setButtonText2] = useState('15.00 MELLCOINS');
  const [buttonColor, setButtonColor] = useState('');

  const handleClick = () => {
    if (balance >= 15.0 && !bust) {
      setBust(true);
      localStorage.setItem('bust', true);
      setBalance(prevBalance => prevBalance - 15.0);
      
    } else {
      // Change button text and color temporarily
      setButtonText('Недостаточно средств');
      setButtonText2('');
      setButtonColor('black');
      
      // Revert button text and color after 1 second
      setTimeout(() => {
        setButtonText('Double Boost X5');
        setButtonText2('15.00 MELLCOINS')
        setButtonColor('');
      }, 1000);
    }
  };

  return (
    <div className="double-boost-container" onClick={handleClick} style={{ backgroundColor: buttonColor }}>
        <div className="double-boost-info">
          <p className="double-boost-name">{buttonText}</p>
          <p className="double-boost-price">{buttonText2}</p>
        </div>
    </div>
  );
};

export default DoubleBoost;
