'use client'

import { IoMdMenu } from "react-icons/io";
import { FaUserCheck } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { RiNumbersFill } from "react-icons/ri";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { FaBoxesStacked } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "../_context/UserContext";







const NavBar = () => {

  const navRef = useRef(null)
  const sideRef = useRef(null)
  const router = useRouter()
  const path = usePathname()
  const { user } = useUser()


  console.log(path.split("/"))


  const offSideLeft = () => {
    const nav = navRef.current
    const side = sideRef.current

    if (nav.style.width == "70%") {
      nav.style.width = "0"
      side.style.width = "0"
    }


  }

  const onSideLeft = () => {
    const nav = navRef.current
    const side = sideRef.current

    nav.style.width = "70%"
    side.style.width = "30%"

  }

  const logOut = ()=>{
    localStorage.removeItem('user');
    router.push("/")
  }

  return (
    <div className={`w-full  bg-antic  ${user == null && "hidden"} ${path.split("/")[1]=="" && "hidden"}`} >
      <div className="flex justify-between p-[1rem] ">
        <div className="flex items-center gap-[.3rem]">
          <FaUserCheck className="" />
          <h1 className="text-black font-semibold">{user?.name}</h1>
        </div>
        <IoMdMenu onClick={onSideLeft} className="text-[20px]" />

        <div ref={navRef} className="w-[0] duration-300 z-10 h-screen absolute text-white bg-black top-0 overflow-hidden right-0">
          <h1 className="px-[1rem] text-antic p-[1rem] text-center min-w-max overflow-hidden">Service Confirmation</h1>

          <ul className="text-antic "   >

            <Link href={"/TrackingOrders"} onClick={offSideLeft} >
              <li className="flex items-center p-[1rem] bg-amber-800 w-[500px] overflow-hidden">
                <FaBoxesStacked className="text-[1.2rem]" />
                <p className="px-[.2rem]  ">Tracking Orders</p>
              </li>
            </Link>

            <Link href="/addorder" onClick={offSideLeft} >
              <li className="flex items-center p-[1rem] bg-amber-800 w-[500px] overflow-hidden">
                <IoIosAddCircle className="text-[1.2rem]" />
                <p className="px-[.2rem] ">Add Order</p>
              </li>
            </Link>



            <Link href="/statistics" onClick={offSideLeft}>
              <li className="flex items-center p-[1rem] bg-amber-800 w-[500px] overflow-hidden">
                <RiNumbersFill className="text-[1.2rem]" />
                <p className="px-[.2rem]  ">Statistics</p>
              </li>
            </Link>

            <li className="flex items-center p-[1rem] bg-amber-800 w-[500px] overflow-hidden cursor-pointer " onClick={offSideLeft}>
              <RiLogoutBoxRLine className="text-[1.2rem]"  />
              <p className="px-[.2rem]  " onClick={logOut}>Log Out</p>
            </li>
          </ul>
        </div>

        <div ref={sideRef} onClick={offSideLeft} className="w-[0] h-screen top-0 left-0 absolute z-10 ">

        </div>
      </div>




    </div>
  )
}

export default NavBar
