import React from 'react';

const Checkbox = ({ handleChange, id, isChecked, text, spanText }) => {
  return (
    <div className="mt-4">
      <label className="text-xs ">
        <input
          type="checkbox"
          id={id}
          checked={isChecked}
          onChange={handleChange}
          className="mr-3 "
        />
        {text}
        {spanText && (
          <span className="text-blue-500 underline"> {' ' + spanText}</span>
        )}
      </label>
    </div>
  );
};

export default Checkbox;
