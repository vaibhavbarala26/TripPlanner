import React from 'react'
import Header from '../Components/Header'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from "axios"
import { IoClose } from "react-icons/io5";
import { doc, setDoc } from "firebase/firestore"; 
import "./Creater.css"
import { useMemo } from 'react';
import Lower from '../Components/Lower';
const src = "https://image.similarpng.com/very-thumbnail/2021/09/Logo-Search-Google--on-transparent-background-PNG.png"
import { chatSession, prompt } from '../function/AiModel';
import { useGoogleLogin } from '@react-oauth/google';
import { db } from '../function/Firebase'
import { useNavigate } from 'react-router-dom'
const Create = () => {
    const [username, setUsername] = useState("");
    const [data, setData] = useState([]);
    const [dataLoading, setDataloading] = useState(false)
    const [loading, setLoading] = useState(false);
    const [openDailog, setOpendailog] = useState(false)
    const [fromData, setFormData] = useState([])
    const navigate = useNavigate()
    const handleinput = (name, value) => {
        setFormData({
            ...fromData,
            username,
            loading,
            [name]: value,
        })
    }
    const fetched = async () => {
        setLoading(true);
        const res = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${username}&format=json&apiKey=1a48ac6c2c34449db832e8ee8f3963f3`)
        const data = await res.json()
        setData(data.results);
        setLoading(false)
    }
    const use = (e) => (
        setUsername(e.target.value)
    )
    useEffect(() => {
        fetched();
    }, [username])
    
    const generatetrip = async () => {
        const user = localStorage.getItem("user");
        if (!user) {
            setOpendailog(true)
            return;
        }
        setDataloading(true);
        const finalprompt = prompt
            .replace("{Location}", fromData?.place)
            .replace("{totaldays}", fromData?.duration)
            .replace("{company}", fromData?.company)
            .replace("{type}", fromData?.bugdet)
            .replace("{city}", fromData?.place)
        console.log(finalprompt);
        const result = await chatSession.sendMessage(finalprompt)
        setDataloading(false)
        console.log(typeof(result.response.text()));
        console.log(result?.response?.text());
        const data = JSON.parse(result?.response?.text());
        saveAITRIP(data)
        
    }
    const saveAITRIP = async(result)=>{
        const id = Date.now().toString();
        const user =  JSON.parse(localStorage.getItem("user"))
        await setDoc(doc(db, "Trips", id), {
          userSelection:fromData,
          trip:result,
          userEmail : user?.email,
          id:id,
        })
        .then(()=>(
            navigate("/view-trip/" + id)
        ))
        
    }
    console.log(openDailog);
    const login = useGoogleLogin({
        onSuccess:(codeResp)=> userinf(codeResp),
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
            setOpendailog(false);
            generatetrip();

        })
        
    }
    return (
        <div>

            <Header></Header>
            <div className='flex justify-center flex-col mt-12 px-28 pl-10 pr-10 md:text-2xl sm:text-1xl'>
                <h1 className='mx-12 text-4xl'>Tell us your travel preferences⛺</h1>
                <p className='mx-14 text-2xl text-gray-400 mt-4'>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>
                <div className='mx-14 mt-10  mb-4 text-3xl'><h1>What is your destination ?</h1></div>
                <div className='mx-14  border-2  hover:border-blue-300  focus:outline-blue-300 flex flex-row items-center justify-between'>
                    <input className='w-[600px] h-10 px-4 border-none  focus:outline-none' value={username} onChange={use} type="text" placeholder='enter the location' />
                    {loading ? <><div class="loader mr-2"></div></> : <></>}
                </div>
                <div className=' flex justify-center flex-col items-center'>
                    {data?.length > 0 && username && data?.map((u) => (
                        <div className=' flex flex-col justify-center items-center mt-2 cursor-pointer border-2 w-[700px] ml-8' onClick={() => { setUsername(u.city); handleinput("place", u.city) }}>{u.city} , {u.state} ,{u.country}</div>
                    ))}
                </div>
                <div className='mx-14 mt-10  mb-4 text-3xl'><h1>How many days are you planning to trip ?</h1></div>
                <form action="" className='mx-14  border-2  hover:border-blue-300  focus:outline-blue-300 flex flex-row items-center justify-between'>
                    <input className='w-full h-10 px-4 border-none  focus:outline-none' type="number" placeholder='enter the location' onChange={(e) => handleinput("duration", e.target.value)} min={0} />
                </form>
                <div className=' mx-14 mt-10'><h1 className='text-3xl'>What's your bugdet?</h1></div>
                <div className='mx-14 grid grid-flow-row grid-cols-4 gap-8 sm:text-sm md:text-1xl' >
                    <div className='mt-3 border-2 rounded-md py-2 px-2 hover:shadow-lg transition-all cursor-pointer' onClick={() => (handleinput("bugdet", "cheap"))}   >
                        <span className='text-4xl sm:text-2xl '>💵</span>
                        <h1 className='text-2xl font-bold sm:text-1xl'>Cheap</h1>
                        <p>Don't want to spend more</p>
                    </div>
                    <div className='mt-3 border-2 rounded-md py-2 px-2 hover:shadow-lg transition-all cursor-pointer ' onClick={() => (handleinput("bugdet", "moderate"))}  >
                        <span className='text-4xl sm:text-2xl'>💰</span>
                        <h1 className='text-2xl font-bold sm:text-xl'>Moderate</h1>
                        <p>Can spend but not enough</p>
                    </div>
                    <div className='mt-3 border-2 rounded-md py-2 px-2 hover:shadow-lg transition-all cursor-pointer ' onClick={() => (handleinput("bugdet", "expensive"))}  >
                        <span className='text-4xl sm:text-2xl'>💸</span>
                        <h1 className='text-2xl font-bold sm:text-xl'>Expensive</h1>
                        <p>Can spend as mush as want</p>
                    </div>
                </div>
                <div className=' mx-14 mt-10'><h1 className='text-3xl'>Who do you planning to travel with ?</h1></div>
                <div className='grid grid-cols-3 mx-14 gap-x-10'>
                    <div className='mt-3 border-2 rounded-md py-2 px-2 hover:shadow-lg transition-all cursor-pointer ' onClick={() => (handleinput("company", "solo"))}  >
                        <span className='text-4xl'>✈️</span>
                        <h1 className='text-2xl font-bold'>Solo</h1>
                        <p>A sole traveles in exploration</p>
                    </div>
                    <div className='mt-3 border-2 rounded-md py-2 px-2 hover:shadow-lg transition-all cursor-pointer ' onClick={() => (handleinput("company", "couple"))}  >
                        <span className='text-4xl'>🥂</span>
                        <h1 className='text-2xl font-bold'>Couple</h1>
                        <p>Two traveles in tandem</p>
                    </div>
                    <div className='mt-3 border-2 rounded-md py-2 px-2 hover:shadow-lg transition-all cursor-pointer ' onClick={() => (handleinput("company", "family"))}  >
                        <span className='text-4xl'>👨‍👩‍👧‍👧</span>
                        <h1 className='text-2xl font-bold'>Family</h1>
                        <p>A happy family</p>
                    </div>
                    <div className='mt-3 border-2 rounded-md py-2 px-2 hover:shadow-lg transition-all cursor-pointer ' onClick={() => (handleinput("company", "friend"))}  >
                        <span className='text-4xl'>👨‍👩‍👧‍👧</span>
                        <h1 className='text-2xl font-bold'>Friends</h1>
                        <p>Freinds </p>
                    </div>
                </div>
                {dataLoading ? <><div className='flex justify-end mb-10'><div class="loadr"></div></div></> : <>
                    <div className='mt-1 justify-end flex px-10 mb-10'><button className='bg-black text-white py-3 px-4 rounded-md font-bold' onClick={(generatetrip)}>Plan Trip</button></div></>}
            </div>
            {openDailog ? <>
           
                <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

                    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                            <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className='flex justify-end cursor-pointer' onClick={()=>setOpendailog(false)}><IoClose/></div>
                                    <div class="sm:flex sm:items-start flex-col">
                                        <h1 className='text-3xl font-bold mb-3'>🚞 Trip Planner</h1>
                                        <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">Sign in with Google</h3>
                                            <div class="mt-2">
                                                <p class="text-sm text-gray-500">Sign in to the App with google authentication Securely</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex justify-center mt-5 mb-5 '>
                                    <div className='flex bg-gray-100 text-black py-2 px-2 rounded-l-lg flex-row items-center gap-2 text-1xl font-semibold cursor-pointer' onClick={login}>Sign in with Google
                                    <img  className="h-10 bg-white rounded-r-lg  "src={src} alt="" />
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </> : <></>}

        </div>
    )
}

export default Create
//418008839630-5oklj9uhc0s2bhh6g5uqjfrljehqa22i.apps.googleusercontent.com