'use client'
import React from 'react'
import { useSeller } from '../_context/sellerContext'
import { FaUserCheck } from 'react-icons/fa'
import { redirect, useRouter } from 'next/navigation'
import axios from 'axios'


const page = () => {
  const { seller } = useSeller()
  const router = useRouter()



  const VerifyID = async (ID) => {
    if (ID == "") {
      return
    }

    try {
      // console.log(ID)
      const res = await axios.get(`/api/numberOrder/${ID}`)
      // console.log(res.data)
      localStorage.setItem('user', JSON.stringify(res.data));
      window.location.href = "/sc/TrackingOrders"

      // router.push("/sc/TrackingOrders")


    } catch (error) {
      console.log(error.message)
    }


  }


  // onClick={()=>{router.push(`/seller/confirmationTeam/${item._id}`)}}
  return (
    <div className='p-4'>

      {
        seller?.users.map(item => {
          return <div key={item._id} className='bg-white w-full rounded-md p-4 mb-4 flex justify-between' onClick={() => { VerifyID(item._id) }}>
            <div className='flex gap-2 items-center ' >
              <FaUserCheck className="" />
              <p>{item.name}</p>
            </div>
          </div>
        })
      }
    </div >
  )
}

export default page
