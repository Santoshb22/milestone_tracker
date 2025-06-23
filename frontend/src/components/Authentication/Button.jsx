import React from 'react'

const Button = ({text, disabled}) => {
  return (
    <button
        type="submit"
        disabled = {disabled}
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
    >
        {text}
    </button>
  )
}

export default Button