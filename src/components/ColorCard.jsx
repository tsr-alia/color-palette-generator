import React, { useState } from "react";
import AddColorButton from "./AddColorButton";

const ColorCard = ({
  color,
  addColorToPalette,
  inPalette,
  handleColorChange,
}) => {
  const [values, setValues] = useState(["00", "00", "00"]); // Default value for the slider

  const handleChange = (e) => {
    if (e.target.id === "slider1") {
      setValues([e.target.value, values[1], values[2]]);
    } else if (e.target.id === "slider2") {
      setValues([values[0], e.target.value, values[2]]);
    } else if (e.target.id === "slider3") {
      setValues([values[0], values[1], e.target.value]);
    }
    changeColor();
  };

  const changeColor = () => {
    let newColor = "#";
    for (let i of values) {
      newColor += convertToHex(i);
    }
    handleColorChange(newColor);
  };

  // Convert the decimal value to hexadecimal
  const convertToHex = (i) =>
    Number(i).toString(16).toUpperCase().padStart(2, "0");

  return (
    <>
     <style jsx>{`
            input[type="range"]::-webkit-slider-runnable-track {
              /* background-color: var(--text-color); */
              /* opacity: 0.25; */
            }
            input[type="range"]::-webkit-slider-thumb {
              height: 20px;
              width: 20px;
              background-color: var(--text-color);
              border-radius: 50%;
              cursor: pointer;
              appearance: none;
              /* margin-top: -5px; Center the thumb on the track */
            }
            input[type="range"]::-moz-range-thumb {
              height: 20px;
              width: 20px;
              background-color: var(--text-color);
              border-radius: 50%;
              cursor: pointer;
            }
          `}</style>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div
          className="h-48 w-full"
          style={{
            backgroundColor: "var(--color)",
            color: "var(--text-color)",
          }}
        >
          <label htmlFor="slider1" className="mb-4 text-lg font-semibold">
            Value: {convertToHex(values[0])}
          </label>
          <input
            id="slider1"
            type="range"
            min="0"
            max="255"
            value={values[0]}
            onChange={handleChange}
            className="w-64 h-2 rounded-lg appearance-none cursor-pointer bg-opacity-25"
            style={{
              backgroundColor: "grey",
              opacity: 0.75
            }}
          />
          <label htmlFor="slider2" className="mb-4 text-lg font-semibold">
            Value: {convertToHex(values[1])}
          </label>
          <input
            id="slider2"
            type="range"
            min="0"
            max="255"
            value={values[1]}
            onChange={handleChange}
            className="w-64 h-2 rounded-lg appearance-none cursor-pointer"
            style={{
              backgroundColor: "grey",
              opacity: 0.75
            }}
          />
          <label htmlFor="slider3" className="mb-4 text-lg font-semibold">
            Value: {convertToHex(values[2])}
          </label>
          <input
            id="slider3"
            type="range"
            min="0"
            max="255"
            value={values[2]}
            onChange={handleChange}
            className="w-64 h-2 rounded-lg appearance-none cursor-pointer"
            style={{
              backgroundColor: "grey",
              opacity: 0.75
            }}
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold sm:text-xl font-mono">
            HEX: {color}
          </h3>
          {/* <h3 className="text-lg font-bold sm:text-xl font-mono">RGB: {color}</h3>
                    <h3 className="text-lg font-bold sm:text-xl font-mono">HSL: {color}</h3> */}
          {!inPalette && (
            <AddColorButton addColorToPalette={addColorToPalette} />
          )}
        </div>
      </div>
    </>
  );
};

export default ColorCard;
