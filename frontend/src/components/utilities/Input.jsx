import React from 'react'

const Input = (props) => {
  return (
    <>
      <label className="my-2 text-black font-medium">{props.title}</label>
      <input value={props.value} onChange={(e)=>(props.change(e.target.value))} type={props.type}  placeholder={props.placeholder} className="pl-4  p-2 mb-2 border-2 border-slate-200 rounded-md"/>
    </>
  )
}

export default Input
