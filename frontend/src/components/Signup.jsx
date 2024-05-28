import React from 'react'
import {  useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { firstNameAtom,lastNameAtom,emailAtom,passwordAtom } from '../store/atoms/atom'
import Heading from './utilities/Heading'
import SubHeading from './utilities/SubHeading'
import Input from './utilities/Input'
import Button from './utilities/Button'
import BottomWarning from './utilities/BottomWarning'
import Border from './utilities/Border'


const Signup = () => {
  const navigate=useNavigate();
  
  const [firstName,setFirstName]=useRecoilState(firstNameAtom);

  const [lastName,setLastName]=useRecoilState(lastNameAtom);

  const [email,setEmail] = useRecoilState(emailAtom);

  const [password,setPassword] = useRecoilState(passwordAtom);

  
  async function handleSubmit(){
    const response = await fetch("http://localhost:3000/api/v1/user/signup", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json' // Ensure Content-Type is set to application/json
        },
        body: JSON.stringify({
            username: email,
            firstName: firstName,
            lastName: lastName,
            password: password
        })
    });
    console.log(response);
    const data=await response.json();
    console.log(data);
    if(response.status==412){
      if(data.message){
        alert(data.message);
      }
      else{
        alert("Please check your email address, firstname, lastname and password \nPassword must be at least 6 characters long \nAll fields are required \nEmail might be already taken");
      }
      setFirstName("");
      setPassword("");
      setEmail("");
      setLastName("");
    }else{
      localStorage.setItem("token",data.token);
      navigate("/dashboard");
    }
  }
  return (
      <Border>
        <Heading label="Sign Up"/>
        <SubHeading label="Enter your information to create your account"/>

        <Input title="First Name" value={firstName} change={setFirstName} type="text" placeholder="John"/>
        <Input title="Last Name" value={lastName} change={setLastName} type="text" placeholder="Doe"/>
        <Input title="Email" value={email} change={setEmail} type="text" placeholder="john@example.com"/>
        <Input title="Password" value={password} change={setPassword} type="password" placeholder="******"/>
        
        <Button title="Sign up" submit={handleSubmit}/>
        <BottomWarning label="Already have an account?&nbsp;" link="Login"/>

      </Border>
  )
}

export default Signup
