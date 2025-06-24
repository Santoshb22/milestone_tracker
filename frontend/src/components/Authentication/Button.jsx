import React from 'react'

const Button = ({text, disabled, onClick}) => {
  return (
    <button
        type="submit"
        disabled = {disabled}
        className="w-full py-3 px-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
        onClick={onClick}
    >
        {text}
    </button>
  )
}

export default Button