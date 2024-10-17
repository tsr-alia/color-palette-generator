import { useState, useEffect } from "react";
import "./App.css";
import ColorCard from "./components/ColorCard";
import RandomColorButton from "./components/RandomColorButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [currentColor, setCurrentColor] = useState("#3498db");
  const [currentTextColor, setCurrentTextColor] = useState("#000000");
  const [palette, setPalette] = useState([
    // { color: "#000", text: "white" },
    // { color: "#333", text: "white" },
    // { color: "#666", text: "white" },
    // { color: "#aaa", text: "black" },
    // { color: "#ddd", text: "black" },
  ]);
  const [prevPalette, setPrevPalette] = useState([]);

  const [showUndoButton, setShowUndoButton] = useState(false);

useEffect(() => {
  if (prevPalette.length !== 0) {
    setShowUndoButton(true); // Trigger the appearance after rendering
  } else {
    setShowUndoButton(false);
  }
}, [prevPalette.length]);

  // helper function to calculate brightness of currentColor
  const calculateBrightness = (hex) => {
    // convert hex to RGB
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    // calculate brightness using relative luminance formula (taking the human eye's sensitivity for different colors into account)
    return 0.299 * r + 0.587 * g + 0.114 * b;
  };

  const handleColorChange = (newColor) => {
    if (calculateBrightness(newColor) > 128) {
      setCurrentTextColor("#000000");
    } else {
      setCurrentTextColor("#FFFFFF");
    }
    setCurrentColor(newColor);
  };

  const addColorToPalette = () => {
    setPrevPalette(palette);
    setPalette((prevPalette) => {
      const newPalette = [
        { color: currentColor, text: currentTextColor },
        ...prevPalette,
      ];
      return newPalette.slice(0, 5);
    });
  };

  const deleteColorFromPalette = (item) => {
    setPrevPalette(palette);
    setPalette((prevPalette) => {
      const newPalette = [
        ...prevPalette.slice(0, item),
        ...prevPalette.slice(item + 1),
      ];
      console.log(newPalette);
      return newPalette;
    });
  };

  const undoLastChange = () => {
    setPrevPalette([]);
    setPalette(prevPalette); // Revert to the previous state
  };

  return (
    <>
      <main
        style={{
          "--color": currentColor,
          "--text-color": currentTextColor,
          backgroundImage: "linear-gradient(to top, var(--color), #fff)",
        }}
        className="min-h-screen "
      >
        <h1>
          <div style={{ color: currentColor }}>Color</div>
          Palette Generator
        </h1>
        <section className="flex flex-row flex-wrap gap-8">
          <section className="w-full md:w-[calc(33.33%-16px)] flex flex-col gap-4">
            <div className="md:w-56 w-full">
              <RandomColorButton
                handleColorChange={handleColorChange}
                color={currentColor}
                textColor={currentTextColor}
              />
              <ColorCard
                color={currentColor}
                textColor={currentTextColor}
                inPalette={false}
                addColorToPalette={addColorToPalette}
                handleColorChange={handleColorChange}
              />
            </div>
          </section>

          <section className="w-full md:w-[calc(66.66%-16px)] flex flex-col items-center justify-center">
            {palette.length !== 0 && (
              <>
                <h2 className="">My Color Palette</h2>
                <div className="flex flex-row flex-wrap justify-center items-center gap-4 w-full">
                  {palette.map((color, index) => (
                    <div key={index} className="basis-28 sm:basis-56">
                      <ColorCard
                        color={color.color}
                        textColor={color.text}
                        deleteColorFromPalette={deleteColorFromPalette}
                        inPalette={true}
                        item={index}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </section>
        </section>
        {prevPalette.length !== 0 && (
          <section
          className={`fixed bottom-0 right-4 transition-appear hover:opacity-100 ${
            showUndoButton ? 'transition-show' : ''
          }`}
        >
            <button
              onClick={undoLastChange}
              className="big colorized"
              style={{ color: currentTextColor, backgroundColor: currentColor }}
            >
              Undo last change!
              <FontAwesomeIcon icon={faRotateLeft} />
            </button>
          </section>
        )}
      </main>
    </>
  );
}

export default App;
