import React from 'react';

const RandomColorButton = ({handleColorChange}) => {
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        // let r = Math.floor(Math.random()*(255 - 1)) + 1;
        // let g = Math.floor(Math.random()*(255 - 1)) + 1;
        // let b = Math.floor(Math.random()*(255 - 1)) + 1;
        // let color = `rgb(${r},${g},${b})`;
        return color;
    };

    const setRandomColor = () => {
        const newColor = getRandomColor();
        handleColorChange(newColor);
    };

    return (
    <button onClick={setRandomColor} style={{ backgroundColor: "var(--color)", color: "var(--text-color)" }}
    className="colorized big w-full">Create a Random Color!</button>
    );
}

export default RandomColorButton;