'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

const page = () => {
  const router = useRouter()
  return (
    <div className='flex flex-col justify-center items-center gap-4 h-screen'>
      <p className='text-blue-400  ' onClick={()=>{router.push("/sc")}}>Employee</p>
      <p className='text-blue-400  ' onClick={()=>{router.push("/seller")}}>seller</p>
    </div>
  )
}

export default page
