import React from 'react'
import photo from "../../assets/photo.jpg"

const Info = ({Trip}) => {

  return (
    <div>
      <div className='px-32 py-8 flex flex-col items-center  sm:px-20'>
        <img src={photo} alt=""  className='px-20 h-[550px] rounded-lg sm:px-1 sm:h-[400px]'/>
        <div className='flex  w-full flex-col'>
        <h1 className='mt-4 font-bold mx-1 text-2xl'>{Trip.userSelection?.place}</h1>
        <div className='flex flex-row gap-20 mt-4'>
        <h2 className='bg-gray-200 px-4 py-2 rounded-xl'>📅{Trip?.userSelection?.duration} Days</h2>
        <h2 className='bg-gray-200 px-4 py-2 rounded-xl'> 👪 No. of Travelers: {Trip?.userSelection?.company}</h2>
        <h2 className='bg-gray-200 px-4 py-2 rounded-xl'>💸bugdet: {Trip?.userSelection?.bugdet}</h2>
        </div>
        <h2></h2>
        </div>
      </div>
    </div>
  )
}

export default Info
