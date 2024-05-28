import React from 'react'

const Button = (props) => {
  return (
    <button className="p-2 w-full rounded-md bg-black text-white mt-2 mb-4" onClick={props.submit}>{props.title}</button>
  )
}

export default Button
