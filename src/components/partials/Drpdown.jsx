import React from "react";

const Drpdown = ({ title, options, fnc }) => {
  return (
    <div className="w-full md:w-auto">
      <select
        defaultValue="0"
        onChange={fnc}
        name="format"
        id="format"
        className="w-full md:w-auto px-4 py-2 rounded-md border border-gray-300 bg-white text-zinc-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="0" disabled>
          {title}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Drpdown;
