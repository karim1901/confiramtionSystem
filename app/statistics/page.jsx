"use client"
import React, { useEffect, useState } from 'react'
import { FaMoneyBillWave } from "react-icons/fa";
import { FaBox } from "react-icons/fa";
import { IoCheckbox } from "react-icons/io5";
import { HiArchiveBoxXMark } from "react-icons/hi2";

import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useUser } from '../_context/UserContext';


const COLORS = ['#00C49F', '#FF8042'];



const Statistics = () => {

    const {orders,user} = useUser()

    const [total , setTotal] = useState(0)

    // console.log(orders)

    const data = [
        { name: 'Livré', value: orders.livre },
        { name: 'Retour', value: orders.retour },
    ];


    useEffect(()=>{
        if(orders.livre >= 60){
            setTotal((orders.livre-(orders.tow+orders.three+orders.four))*15+(orders.tow*2*15)+(orders.three*3*15)+(orders.four*4*15))
        }else{
            setTotal((orders.livre-(orders.tow+orders.three+orders.four))*10+(orders.tow*2*10)+(orders.three*3*10)+(orders.four*4*10))

        }
    },[orders.livre])


    return (
        <div>
            <h1 className='p-[1rem]'>Statistics</h1>

            <div className='px-4 flex flex-col gap-4'>
                <div className='bg-white w-full h-[150px] rounded-md flex items-center justify-between p-4'>
                    <div>
                        <p className='text-[2rem]'>{total}.00 DH</p>
                        <p className='text-[13px] mt-[-10px]'>Total Income</p>
                    </div>
                    <FaMoneyBillWave className='text-[4rem]' />
                </div>

                <div className='bg-white w-full h-[150px] rounded-md flex items-center justify-between p-4'>
                    <div>
                        <p className='text-[2rem]'>{orders.order}</p>
                        <p className='text-[13px] mt-[-10px]'>Total Orders</p>
                    </div>
                    <FaBox className='text-[4rem]' />
                </div>

                <div className='bg-white w-full h-[150px] rounded-md flex items-center justify-between p-4'>
                    <div>
                        <p className='text-[2rem]'>{orders.livre}</p>
                        <p className='text-[13px] mt-[-10px]'>Total Livre</p>
                    </div>
                    <IoCheckbox className='text-[4rem]' />
                </div>

                <div className='bg-white w-full h-[150px] rounded-md flex items-center justify-between p-4'>
                    <div>
                        <p className='text-[2rem]'>{orders.retour}</p>
                        <p className='text-[13px] mt-[-10px]'>Total retour</p>
                    </div>
                    <HiArchiveBoxXMark className='text-[4rem]' />

                </div>

                <div className='bg-white w-full h-[150px] rounded-md flex justify-between items-center  p-4'>

                    <div className=''>
                        <p className='font-semibold'>2 Orders</p>
                        <p className='text-center'>{orders.tow}</p>
                    </div>
                    <div className=' '>
                        <p className='font-semibold'>3 Orders</p>
                        <p className='text-center'>{orders.three}</p>
                    </div>
                    <div className=' '>
                        <p className='font-semibold'>4 Orders</p>
                        <p className='text-center'>{orders.four}</p>
                    </div>


                    {/* <div>
                        <p className='text-[2rem]'>{orders.retour}</p>
                        <p className='text-[13px] mt-[-10px]'>Total retour</p>
                    </div> */}
                    {/* <HiArchiveBoxXMark className='text-[4rem]' /> */}



                </div>

                <div className="flex flex-col items-center justify-center mt-4 bg-white p-4 outline-none focus:outline-none">
                    <h2 className="text-lg font-semibold mb-4">Delivery and Returns Ratio</h2>
                    <PieChart width={300} height={300}>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={3}
                            dataKey="value"
                            label
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip content={null} />
                        <Legend />
                    </PieChart>
                </div>
            </div>



        </div>
    )
}

export default Statistics
