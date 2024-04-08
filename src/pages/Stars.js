import React, { useState, useEffect } from 'react';
import './Stars.css'; // Импортируем файл стилей для звезд

const Stars = () => {
    const [stars, setStars] = useState([]);

    useEffect(() => {
        const createStar = () => {
            // Генерируем данные для новой звезды
            const newStar = {
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                size: Math.random() * 3 + 1,
                xEnd: 1000 * (Math.random() - 0.5),
                yEnd: 1000 * (Math.random() - 0.5),
                scaleEnd: Math.random() * 1.5 + 0.5,
                animationDuration: (Math.random() * 3 + 2) * 2 // Увеличиваем время анимации в два раза
            };

            setStars(prevStars => [...prevStars, newStar]);
        };

        const interval = setInterval(createStar, 100); // Создаем звезды каждые 100 миллисекунд

        return () => clearInterval(interval); // Очищаем интервал при размонтировании компонента
    }, []);

    return (
        <>
            {stars.map((star, index) => (
                <div
                    key={index}
                    className="star"
                    style={{
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        left: `${star.x}px`,
                        top: `${star.y}px`,
                        '--x-end': `${star.xEnd}px`,
                        '--y-end': `${star.yEnd}px`,
                        '--scale-end': star.scaleEnd,
                        animation: `fly ${star.animationDuration}s linear forwards`
                    }}
                    onAnimationEnd={() => {
                        setStars(prevStars => prevStars.filter((_, i) => i !== index));
                    }}
                />
            ))}
        </>
    );
};

export default Stars;
