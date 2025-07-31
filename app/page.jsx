'use client'

import axios from "axios";
import { useEffect, useState } from "react";
import { useUser } from "./_context/UserContext";
import { useRouter } from "next/navigation";




export default function Home() {

  const [ID, setID] = useState("")

  const {user,setUser} = useUser()
  const router = useRouter()

  const onChangeInput = ({ target }) => {
    setID(target.value)
  }


  useEffect(() => {
    if (user) {
        router.push("/TrackingOrders")
    }
  },[user])


  const VerifyID = async () => {
    if(ID==""){
      return 
    }

    try {
      console.log(ID)
      const res = await axios.get(`/api/numberOrder/${ID}`)

      setUser(res.data)

      console.log(res.data)

      router.push("/TrackingOrders")


    } catch (error) {
      console.log(error.message)
    }


  }



  return (
    <div>
      <div className="mt-[5rem] px-[4rem]">

        <h1 className="text-center font-semibold">Insert ID</h1>

        <input type="text" className="w-full mt-4 pl-4 h-[2rem] rounded-md outline-none " name="ID" value={ID} onChange={onChangeInput} placeholder="ID" />

        <button onClick={VerifyID} className="p-[.5rem] mt-4 rounded-md bg-black text-white w-full ">Go to Account</button>

      </div>
    </div>
  );
}
