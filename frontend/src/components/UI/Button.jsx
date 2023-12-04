import React from 'react'

const Button = ({ type, text, onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={
        'text-xl font-bold text-white rounded-lg bg-blue-500 mt-6 w-full py-2'
      }
    >
      {text}
    </button>
  )
}

export default Button
