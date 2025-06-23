import React from 'react';

const HeaderButton = ({ text }) => {
  return (
    <button
      className="cursor-pointer border-2 px-4 py-2 rounded-3xl 
                 border-pink-600
                 hover:bg-pink-600 
                 transition-all duration-500 ease-in-out"
    >
      {text}
    </button>
  );
};

export default HeaderButton;
