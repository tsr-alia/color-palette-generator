import React from 'react';

const RandomColorButton = ({handleColorChange, currentColor, currentTextColor}) => {
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const setRandomColor = () => {
        const newColor = getRandomColor();
        handleColorChange(newColor);
    };

    return (
    <button onClick={setRandomColor} style={{ backgroundColor: "var(--color)", color: "var(--text-color)" }}
    className="colorized w-full">Create a Random Color!</button>
    );
}

export default RandomColorButton;
