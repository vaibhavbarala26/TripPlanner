import React from 'react'
import {Link, useNavigate} from "react-router-dom"
import london from "../assets/london.jpg"
import paris from "../assets/paris.jpg"
import shimla from "../assets/shimla.jpg"
import kashmir from "../assets/kashmir.avif"
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../function/Firebase'
import { chatSession, prompt } from '../function/AiModel'
const Hero = () => {
  const navigate = useNavigate();
  const generatetrip = async (place , duration , company , bugdet , city) => {
    const user = localStorage.getItem("user");
    if (!user) {
        return;
    }
    
    const finalprompt = prompt
        .replace("{Location}", place)
        .replace("{totaldays}", duration)
        .replace("{company}", company)
        .replace("{type}", bugdet)
        .replace("{city}", city)
    console.log(finalprompt);
    const result = await chatSession.sendMessage(finalprompt)
    console.log(typeof(result.response.text()));
    console.log(result?.response?.text());
    const data = JSON.parse(result?.response?.text());
    saveAITRIP(data)
    
}
const saveAITRIP = async(result)=>{
    const id = Date.now().toString();
    const user =  JSON.parse(localStorage.getItem("user"))
    await setDoc(doc(db, "Trips", id), {
      trip:result,
      userEmail : user?.email,
      id:id,
    })
    .then(()=>(
        navigate("/view-trip/" + id)
    ))
    
}
  return (
    <div>
      <div className=' flex justify-center flex-col'>
        <h1 className='mt-16 text-5xl px-24  text-center'>
        <span className='text-red-600'>AI-Powered Travel Companion:</span> Effortlessly Plan Your Perfect Journey!</h1>
        <p className='text-center text-3xl px-36 mt-10 text-gray-500'>Discover the future of travel planning with personalized itineraries and smart recommendations. Let our AI technology transform your travel experience</p>
        <div className='flex justify-center '>
        <Link to="/create-trip">
        <button className='mt-8 bg-red-600 px-2 py-2 rounded-md text-1xl text-white hover:scale-100  '>Get started it's Free</button>
        </Link>
        </div>
      </div>
      <div className='grid grid-flow-row grid-cols-4 px-48 py-12 mx-auto gap-10  sm:hidden'>
        <div className='border px-4 py-3 cursor-pointer hover:scale-105 transition-all' onClick={()=>(generatetrip("shimla" , "5" , "partner" , "moderate" , "shimla"))}>
        <img className='h-48 w-56 ' src={shimla}alt="" />
        <span className='font-bold'>Shimla</span>
        <p>5 day trip to shimla with moderate bugdet with partner</p>
        </div>
        <div className='border px-4 py-3 cursor-pointer hover:scale-105 transition-all' onClick={()=>(generatetrip("Kashmir" , "5" , "Family" , "moderate" , "Kashmir"))}>
        <img className='h-48 w-56 ' src={kashmir}alt="" />
        <span className='font-bold'>Kashmir</span>
        <p>5 day trip to Kashmir with moderate bugdet with family</p>
        </div>
        <div className='border px-4 py-3 cursor-pointer hover:scale-105 transition-all' onClick={()=>(generatetrip("London" , "5" , "friends" , "moderate" , "London"))}>
        <img className='h-48 w-56 ' src={london}alt="" />
        <span className='font-bold'>London</span>
        <p>7 day trip to London with moderate bugdet with freinds</p>
        </div>
        <div className='border px-4 py-3 cursor-pointer hover:scale-105 transition-all' onClick={()=>(generatetrip("Paris" , "5" , "partner" , "moderate" , "Paris"))}>
        <img className='h-48 w-56 ' src={paris}alt="" />
        <span className='font-bold'>Paris</span>
        <p>5 day trip to Paris with moderate bugdet with partner</p>
        </div>
      </div>
    </div>
  )
}

export default Hero
