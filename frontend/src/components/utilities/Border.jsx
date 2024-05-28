import React from 'react'

const Border = ({children}) => {
  return (
    <div className=" text-gray-500 flex flex-row min-h-screen justify-center items-center bg-gray-500">
      <div className="px-8 max-w-96 bg-slate-100 rounded-md flex flex-col">
        {children}
      </div>
    </div>
  )
}

export default Border
