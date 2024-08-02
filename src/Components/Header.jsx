import { useGoogleLogin } from '@react-oauth/google';
import React from 'react'
import {Link} from "react-router-dom"
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useEffect } from 'react';
const Header = () => {
  const navigate = useNavigate()
  const user = localStorage.getItem("user") || "nouser";
  
  const logout = ()=>{
    localStorage.removeItem("user");
    navigate("/create-trip");
  }
  const login = useGoogleLogin({
    onSuccess:(codeResp)=> {
      userinf(codeResp);
      navigate("/create-trip")
      },
    onError:(errro)=>console.log(errro)
})
const userinf = async(token)=>{
  await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${token?.access_token}` , {
      headers:{
          Authorization:`Bearer ${token?.access_token}`,
          Accept:"Application/json"
      }
  }).then((res)=>{
      console.log(res);
      localStorage.setItem("user" , JSON.stringify(res.data))
  })
}
const handle = ()=>{
  navigate("/create-trip")
}
const handles = ()=>{
  navigate("/my-trip")
}

  return (
    <div>
      <div className='flex flex-row items-center justify-between mx-3 '>
        <div>
        <Link to={"/"}><h1 className='text-4xl font-bold mb-3'>🚞 Trip Planner</h1></Link>
      </div>

      {user === "nouser" ? <> <button className='bg-black px-2 py-2 text-1xl rounded-md text-white' onClick={login}> Signin</button></>:<> <div className='flex gap-4'><button className='border rounded-lg px-4' onClick={handle}>+ Trip</button><button className='bg-black px-2 py-2 text-1xl rounded-md text-white' onClick={(logout)}> Signout</button></div></>}
     
      </div>
    </div>
  )
}

export default Header
//418008839630-eqg0la7gnmncskbdr394mjida3igl41d.apps.googleusercontent.com

//418008839630-eqg0la7gnmncskbdr394mjida3igl41d.apps.googleusercontent.com