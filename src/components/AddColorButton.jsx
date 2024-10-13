import React, {useState} from 'react';

const AddColorButton = ({addColorToPalette}) => {

    return (
    <button onClick={addColorToPalette} style={{ backgroundColor: "var(--color)", color: "var(--text-color)" }}
    className="colorized">+ add to color palette</button>
    );
}

export default AddColorButton;