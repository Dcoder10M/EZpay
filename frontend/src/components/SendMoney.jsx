import React,{useState} from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'

const SendMoney = () => {
  const [query]=useSearchParams();
  const to=query.get('to');
  const token=query.get('token');

  const [amount,setAmount]=useState(0);

  async function handle(){
    console.log("here");
    const response=await axios.post("http://localhost:3000/api/v1/account/transfer",{
      amount,
      to
    },{
      headers:{
        token:`Bearer ${token}`
      }
    })
    if(response.status==200){
      alert('transfer success');
    }else{
      alert('error occured while transfer')
    }
  }

  return (
    <div className=" text-black flex flex-row min-h-screen justify-center items-center bg-slate-300">
      <div className="px-8 max-w-96 bg-gray-400 rounded-md flex flex-col">
        <h1 className='flex flex-row justify-center items-center text-2xl font-bold p-6'>Send Money</h1>
        <h4 className='my-2 text-lg font-medium'>Amount</h4>
        <input onChange={e=>setAmount(e.target.value)} className='p-2 rounded-md' type="number" />
        <button className='bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded my-4' onClick={handle}>Initiate Transaction</button>
      </div>
    </div>
  )
}

export default SendMoney
