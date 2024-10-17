import React, { useState, useEffect, useRef } from "react";
import AddColorButton from "./AddColorButton";

const ColorCard = ({
  color,
  textColor,
  addColorToPalette,
  inPalette,
  handleColorChange,
}) => {
  const [rgbValues, setRgbValues] = useState({
    r: parseInt(color.slice(1, 3), 16),
    g: parseInt(color.slice(3, 5), 16),
    b: parseInt(color.slice(5, 7), 16),
  });

  // Use a ref to track if the color change is coming from the user input
  const isUserInput = useRef(false);

  useEffect(() => {
    if (!isUserInput.current) {
      console.log([
        parseInt(color.slice(1, 3), 16),
        parseInt(color.slice(3, 5), 16),
        parseInt(color.slice(5, 7), 16),
      ]);
      setRgbValues({
        r: parseInt(color.slice(1, 3), 16),
        g: parseInt(color.slice(3, 5), 16),
        b: parseInt(color.slice(5, 7), 16),
      });
    }
    isUserInput.current = false;
  }, [color]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRgbValues((prevValues) => {
      const newRgb = { ...prevValues, [name]: Number(value) }; // Convert value to number
      changeColor(newRgb);

      return newRgb; // Return the new state
    });
    isUserInput.current = true;
  };

  // Convert the decimal value to hexadecimal
  const convertToHex = (i) =>
    Number(i).toString(16).toUpperCase().padStart(2, "0");

  const changeColor = (newRgb) => {
    let newColor = "#";
    newColor += convertToHex(newRgb.r);
    newColor += convertToHex(newRgb.g);
    newColor += convertToHex(newRgb.b);
    handleColorChange(newColor);
  };

  console.log(color);
  return (
    <>
      <style jsx>{`
        input[type="range"]::-webkit-slider-runnable-track {
          /* background-color: var(--text-color); */
          /* opacity: 0.25; */
        }
        input[type="range"]::-webkit-slider-thumb {
          height: 15px;
          width: 15px;
          background-color: var(--text-color);
          border-radius: 50%;
          cursor: pointer;
          appearance: none;
          /* margin-top: -5px; Center the thumb on the track */
        }
        input[type="range"]::-moz-range-thumb {
          height: 15px;
          width: 15px;
          background-color: var(--text-color);
          border-radius: 50%;
          cursor: pointer;
        }
      `}</style>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden md:w-56 w-full">
        <div
          className="w-full font-mono min-h-36"
          style={{
            backgroundColor: color,
            color: textColor,
          }}
        >
          {!inPalette && (
            <div className="p-4">
              <label htmlFor="r" className="font-semibold">
                Red: {rgbValues.r} / HEX: {convertToHex(rgbValues.r)}
              </label>
              <input
                id="r"
                name="r"
                type="range"
                min="0"
                max="255"
                value={rgbValues.r}
                onChange={handleChange}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-opacity-25"
                style={{
                  backgroundColor: "grey",
                  opacity: 0.75,
                }}
              />
              <label htmlFor="g" className="font-semibold">
                Green: {rgbValues.g} / HEX: {convertToHex(rgbValues.g)}
              </label>
              <input
                id="g"
                name="g"
                type="range"
                min="0"
                max="255"
                value={rgbValues.g}
                onChange={handleChange}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                style={{
                  backgroundColor: "grey",
                  opacity: 0.75,
                }}
              />
              <label htmlFor="b" className="font-semibold">
                Blue: {rgbValues.b} / HEX: {convertToHex(rgbValues.b)}
              </label>
              <input
                id="b"
                name="b"
                type="range"
                min="0"
                max="255"
                value={rgbValues.b}
                onChange={handleChange}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                style={{
                  backgroundColor: "grey",
                  opacity: 0.75,
                }}
              />
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-base font-bold font-mono">HEX: {color}</h3>
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
