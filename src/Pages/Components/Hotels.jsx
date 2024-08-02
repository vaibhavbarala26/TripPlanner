import React from 'react'

const Hotels = ({ Trip }) => {
    console.log(Trip?.trip);
    return (
        <div className='  w-full px-44 sm:px-10 '>
            <div className='px-56 sm:px-10'>
                <h1 className='text-2xl font-bold'>Hotel Recommendation</h1>
                <div className='grid grid-flow-row grid-cols-4 gap-10 mt-10 mb-10 sm:grid-cols-1'>
                    {
                         1 && Trip?.trip?.hotel_options?.map((i)=>(
                            <>
                            <div className='border px-4 py-4 rounded-xl hover:scale-105 transition-all cursor-pointer '>
                                <div className='flex flex-col text-left'>
                                    <span className='font-bold'>🛏️ {i.name}</span>
                                    <span> 💰{i.price}</span>
                                    <span>⭐ {i.rating}</span>
                                    <span >📍{i.address}</span>
                                </div>
                            </div>
                            </>
                        ))
                    }

                </div>
                <div className=''>
                {
                        1 && Trip?.trip?.itinerary?.map((i)=>(
                            <>
                            <div>
                                <h1 className='text-1xl font-bold text-red-400 mb-4'>{i.day}</h1>
                                <div className='grid grid-flow-row grid-cols-3 gap-10 mb-10 md:grid-cols-2 sm:grid-cols-2 '>
                                    {
                                        
                                        1 && i.schedule.map((m)=>(
                                            <>
                                            <div className=''>
                                                <div className='flex flex-col border px-4 py-4 cursor-pointer hover:scale-105 transition-all rounded-lg'>
                                                <span className='font-bold'>{m.place}</span>
                                                <span>{m.rating}</span>
                                                <span>{m.ticket_pricing_range}</span>
                                               <span>{m.time}</span>
                                                </div>
                                            </div>
                                            </>
                                        ))
                                    }
                                </div>
                            </div>
                            </>
                        ))
                    }

                </div>
            </div>

        </div>
    )
}

export default Hotels
