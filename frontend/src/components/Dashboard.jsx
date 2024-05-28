import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate=useNavigate();
  const [balance,setBalance]=useState(0);
  const token=localStorage.getItem('token');
  useEffect(()=>{
    async function initialBalance(){
      const response = await fetch("http://localhost:3000/api/v1/account/balance", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json', // Properly capitalized header
            'token':`Bearer ${token}`
          }
        });
        const data=await response.json();
        // console.log(data.balance);
        setBalance(data.balance);
    }
    initialBalance();
    
    },[])
    const [inputState,setInputState]=useState("");
  const [users,setUsers]=useState([{"key":"value"}]);
  useEffect(()=>{
    async function fetchUsers(){
      const response=await fetch(`http://localhost:3000/api/v1/user/bulk?filter=${inputState}`,{
        method:'GET'
      })
      const data=await response.json();
      setUsers(data.user);
      console.log(data);
    }
    fetchUsers();
  },[inputState])

  function handleSearch(e){
    setInputState(e.target.value);
    console.log(inputState);
  }

  function handleTransaction(to){
    navigate(`/send?to=${to}&token=${token}`);
  }

  return (
    <div className="min-h-screen bg-slate-300">
        <div className="flex justify-between border-b-2 border-slate-500 p-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <h4 className='flex items-center justify-center font-medium text-lg'>Hello, User</h4>
        </div>
        <div className='p-6 font-bold text-xl'>
          Your Balance is ${balance}
        </div>
        

        <div className="p-6">
          <h1 className='text-2xl font-bold mb-4'>
            Users
          </h1>
          <div >
            <input onInput={handleSearch} type="text" placeholder='Search users' className='mb-6 p-2 min-w-full border-2 rounded-md border-slate-400'/>
          </div>
          <div>
          {
            users.map((e,i)=>(
              <div key={i} className="flex justify-between p-4 font-bold text-lg">
                <div className='flex items-center justify-center'>
                {e.email}
                </div>
                <button  onClick={()=>handleTransaction(e._id)} className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded">
                  Send Money
                </button>
              </div>
            ))
          }
          </div>
        </div>
    </div>
  )
}

export default Dashboard
