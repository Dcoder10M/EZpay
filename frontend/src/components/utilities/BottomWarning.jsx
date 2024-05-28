import React from 'react'
import { Link } from 'react-router-dom'

const BottomWarning = (props) => {
  return (
    <h5 className="flex justify-center items-center text-black font-medium mb-8">
        <span>{props.label}</span>
        <Link className='underline' to="/signin">{props.link}</Link>
    </h5>
  )
}

export default BottomWarning
