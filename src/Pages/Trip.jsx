import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import photo from "../assets/photo.jpg"
import { useParams } from 'react-router-dom'
import { doc, getDoc } from "firebase/firestore";
import { db } from '../function/Firebase';
import Info from './Components/Info';
import Hotels from './Components/Hotels';
const Trip = () => {
    const [TripData , setTripData] = useState([])
    const id = useParams().id
    const getData = async()=>{
    const docref = doc(db , "Trips" , id);
    const docSnap = await getDoc(docref);
    if(docSnap.exists()){
        setTripData(docSnap.data());
       
    }
    else{
        setTripData("{msg : no data}")
        console.log("no data");
    }
    }
    useEffect(()=>{
        getData();
    }, [])
    return (
        <div>
            <div>
                <Header></Header>
                <div className='flex flex-col h-[100vh] items-center'>
                <Info Trip={TripData}></Info>
                <Hotels Trip={TripData}></Hotels>
                </div>
            </div>
        </div>
    )
}
export default Trip;