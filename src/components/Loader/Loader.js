import React, { useState, useEffect } from 'react';
import './Loader.css'; // Стили для Loader

const Loader = ({ duration = 10000 }) => {
  console.log(duration);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const startTime = Date.now();
    const endTime = startTime + duration;

    const intervalId = setInterval(() => {
      const now = Date.now();
      const elapsed = now - startTime;
      const remaining = Math.max(0, endTime - now);
      const progress = (remaining / duration) * 100;
      setProgress(progress);

      if (elapsed >= duration) {
        clearInterval(intervalId);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, [duration]);

  return (
    <div className="loader-container">
      <div className="loader" style={{ width: `${progress}%` }} />
    </div>
  );
};

export default Loader;
