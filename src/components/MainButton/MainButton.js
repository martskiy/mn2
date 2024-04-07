// src/components/MainButton/MainButton.js

import React from 'react';
import './MainButton.css';
import { Link } from 'react-router-dom';

const MainButton = () => {
  return (
    <div className="main-button">
      <Link to="/claim" className="button-section link-style">🎒</Link>
      <Link to="/boost" className="button-section link-style">🔋</Link>
      <Link to="/task" className="button-section link-style">📮</Link>
    </div>
  );
};

export default MainButton;

