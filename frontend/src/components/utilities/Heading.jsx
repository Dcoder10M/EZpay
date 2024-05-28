import React from 'react'

const Heading = (props) => {
  return (
    <h1 className="mt-6 text-black text-3xl  font-extrabold flex flex-col justify-center items-center">{props.label}</h1>
  )
}

export default Heading
