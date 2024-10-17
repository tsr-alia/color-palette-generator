import React, { useState } from "react";

const AddColorButton = ({ addColorToPalette }) => {
  return (
    <button
      onClick={addColorToPalette}
      style={{ color: "var(--text-color)" }}
      className="colorized small relative overflow-hidden whitespace-nowrap transition-all duration-700 ease-in-out group"
    >
      <button
        className="inline-block px-2 py-1 rounded-full group-hover:rounded-e transition-all duration-700"
        style={{ backgroundColor: "var(--color)" }}
      >
        +{" "}
      </button>
      <span
        className="inline-block px-2 py-1 rounded-e transform -translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-700 ease-in-out bg-opacity-50"
        style={{ backgroundColor: "var(--color)" }}
      >
        {" "}
        add to color palette
      </span>
    </button>
  );
};

export default AddColorButton;
