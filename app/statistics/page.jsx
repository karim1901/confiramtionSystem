"use client"
import React, { useEffect } from 'react'
import { FaMoneyBillWave } from "react-icons/fa";
import { FaBox } from "react-icons/fa";
import { IoCheckbox } from "react-icons/io5";
import { HiArchiveBoxXMark } from "react-icons/hi2";

import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useUser } from '../_context/UserContext';


const COLORS = ['#00C49F', '#FF8042'];



const Statistics = () => {

    const {orders,user} = useUser()

    console.log(orders)

    const data = [
        { name: 'Livré', value: orders.livre },
        { name: 'Retour', value: orders.retour },
    ];

    return (
        <div>
            <h1 className='p-[1rem]'>Statistics</h1>

            <div className='px-4 flex flex-col gap-4'>
                <div className='bg-white w-full h-[150px] rounded-md flex items-center justify-between p-4'>
                    <div>
                        <p className='text-[2rem]'>{user?.name == "ibtissam"? orders.livre*15 : orders.livre*10}.00 DH</p>
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
