'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaBox } from 'react-icons/fa'
import { MdTimer } from 'react-icons/md'
import { IoCheckbox } from 'react-icons/io5'
import { HiArchiveBoxXMark } from 'react-icons/hi2'
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useSeller } from '../../_context/sellerContext'


const COLORS = ['#00C49F', '#FF8042'];


const page = ({ params }) => {
    const {id} = params
    const { seller, orders, statistics } = useSeller()
    const router = useRouter()
    // console.log(statistics)

    // const [team, setTeam] = useState({})

    // useEffect(()=>{
    //     for(let i = 0 ; i < seller?.users.length ; i++){
    //         if(seller?.users[i]._id == id){
    //             // setTeam(seller?.users[i])
                
    //             break
    //         }
    //     }

    //     console.log(seller?.users[0]._id == id)
    // },[seller])

    const data = [
        { name: 'Livré', value: statistics?.livre.length },
        { name: 'Retour', value: statistics?.retour.length },
    ];


    console.log(team)
    

    return (
        <div className='px-4'>
            {/* {seller?.fullName} */}



            <div className='  flex flex-col gap-4'>
                <div className='bg-white w-full h-[150px] rounded-md flex items-center justify-between p-4' onClick={() => { router.push("/seller/dashboard/orders") }}>
                    <div>
                        {/* <p className='text-[2rem]'>{orders.filter((item)=>{item["INFOS"]["TRACKING-NUMBER"].includes(team?._id)}).length}</p> */}
                        <p className='text-[13px] mt-[-10px]'>Total Orders</p>
                    </div>
                    <FaBox className='text-[4rem]' />
                </div>


                <div className='bg-white w-full h-[150px] rounded-md flex items-center justify-between p-4' onClick={() => { router.push("/seller/dashboard/progress") }}>
                    <div>
                        <p className='text-[2rem]'>{statistics.progress.length}</p>
                        <p className='text-[13px] mt-[-10px]'>Orders in Progress</p>
                    </div>
                    <MdTimer className='text-[4rem]' />
                </div>

                <div className='bg-white w-full h-[150px] rounded-md flex items-center justify-between p-4' onClick={() => { router.push("/seller/dashboard/livre") }}>
                    <div>
                        <p className='text-[2rem]'>{statistics.livre.length}</p>
                        <p className='text-[13px] mt-[-10px]'>Total Livre</p>
                    </div>
                    <IoCheckbox className='text-[4rem]' />
                </div>

                <div className='bg-white w-full h-[150px] rounded-md flex items-center justify-between p-4' onClick={() => { router.push("/seller/dashboard/retour") }}>
                    <div>
                        <p className='text-[2rem]'>{statistics.retour.length}</p>
                        <p className='text-[13px] mt-[-10px]'>Total retour</p>
                    </div>
                    <HiArchiveBoxXMark className='text-[4rem]' />

                </div>
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
    )
}

export default page
