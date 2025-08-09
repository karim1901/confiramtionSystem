"use client"
import Link from 'next/link'
// import { useRouter } from 'next/router'
import React, { useRef } from 'react'
import { IoMdMenu } from 'react-icons/io'
import { IoStorefrontSharp } from 'react-icons/io5'
import { AiFillDashboard } from "react-icons/ai";
import { usePathname } from 'next/navigation'
import { useSeller } from '../_context/sellerContext'
import { RiCustomerService2Fill } from "react-icons/ri";


const Navbar = () => {

  const navRef = useRef(null)
  const sideRef = useRef(null)
  // const router = useRouter()
  const path = usePathname()
  const { seller, setSeller } = useSeller()


  // console.log(path.split("/").length == 2)


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


  return (
    <div className={`bg-white h-[3rem] w-full ${path.split("/").length == 2 && "hidden"} `}>
      <div className="flex justify-between p-[1rem]  ">
        <div className="flex items-center gap-[.3rem]">
          <IoStorefrontSharp />
          <h1 className="text-black font-semibold">{seller?.storeName}</h1>
        </div>
        <IoMdMenu onClick={onSideLeft} className="text-[20px]" />

        <div ref={navRef} className="w-[0] duration-300 z-[100] h-full fixed text-white bg-black top-0 overflow-hidden right-0">
          <h1 className='p-4 text-center min-w-max'>Ozon Management</h1>
          <ul className='mt-4 bg-amber-800'>
            <Link href={"/seller/dashboard"} onClick={offSideLeft}>
              <li className="flex items-center p-[1rem] bg-amber-800 overflow-hidden min-w-max ">
                <AiFillDashboard className='text-[1.2rem]' />
                <p className='px-[0.2rem]'>Dashboard</p>
              </li>
            </Link>

            <Link href={"/seller/confirmationTeam"}  onClick={offSideLeft}>
              <li className="flex items-center p-[1rem] bg-amber-800 overflow-hidden min-w-max ">
                <RiCustomerService2Fill className='text-[1.2rem]' />
                <p className='px-[0.2rem]'>Confirmation Team </p>
              </li>
            </Link>

            <Link href={"/"}  onClick={offSideLeft}>
              <li></li>
            </Link>
            <Link href={"/"} onClick={offSideLeft}>
              <li></li>
            </Link>
          </ul>
        </div>
        <div ref={sideRef} onClick={offSideLeft} className="w-[0] h-screen top-0 left-0 absolute z-10 "></div>
      </div>
    </div>
  )
}

export default Navbar
