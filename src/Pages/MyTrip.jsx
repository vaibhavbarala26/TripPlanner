import React, { useEffect, useState } from 'react'
import Header from "../Components/Header"
import { db } from '../function/Firebase';
import { collection, getDocs } from "firebase/firestore";
import photo from "../assets/photo.jpg"
const MyTrip = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log((user));
  const [TripData, setTripData] = useState([])
  const getData = async () => {

    const querySnapshot = await getDocs(collection(db, "Trips"));
    querySnapshot.forEach((doc) => {
      if(doc.data().userEmail === user.email ){
      // doc.data() is never undefined for query doc snapshots
      const trip = Object.values(doc.data());
      console.log(trip);
      setTripData(trip);
      }

    });
  }

  
  useEffect(() => {
    getData();
    
  } , [])
  return (
    <div>
      <div className="">
        <Header></Header>
        <div className='w-full px-32 flex justify-center mt-12'>
          <h1 className='text-3xl font-bold'>My Trips</h1>
        </div>
        <div>
          {1 && (TripData).map((i)=>(
            <>
            <div className='px-32 grid-flow-row grid-cols-2'>
              <img src={photo} alt="" className='h-32' />
              <div>
                {}
              </div>
            </div>
            
            </>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MyTrip
