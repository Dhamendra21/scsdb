import React from 'react'
import loader from "/loader.gif"


const Loading = () => {
  return (
    <div className='w-full h-screen text-center flex items-center justify-center bg-black'>
        <img src={loader} alt="Loading..." />
    </div>
  )
}

export default Loading