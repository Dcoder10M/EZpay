import React from 'react'
import Border from './utilities/Border'
import Heading from './utilities/Heading'
import SubHeading from './utilities/SubHeading'
import Input from './utilities/Input'
import Button from './utilities/Button'
import BottomWarning from './utilities/BottomWarning'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signin = () => {
  const navigate=useNavigate();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");


  const handleSubmit = async() => {
    const response = await fetch("http://localhost:3000/api/v1/user/signin", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json' // Ensure Content-Type is set to application/json
      },
      body: JSON.stringify({
        username: email,
        password: password
      })
    });
    const data=await response.json();
    console.log(data);
    if(response.status==200){
      localStorage.setItem("token",data.token);
      navigate("/dashboard")
    }else{
      alert(data.message);
    }
  }

  return (
    <Border>
      <Heading label="Sign In"/>
      <SubHeading label="Enter your credentials to access your account"/>

      <Input title="Email" value={email} change={setEmail} type="text" placeholder="john@example.com"/>
      <Input title="Password" value={password} change={setPassword} type="password" placeholder="*******"/>

      <Button title="Sign In" submit={handleSubmit}/>
      <BottomWarning label="Don't have an account?&nbsp;" link="Register"/>
    </Border>
  )
}

export default Signin
