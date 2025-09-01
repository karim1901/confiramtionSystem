'use client'
import axios from 'axios'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { useUser } from '../../_context/UserContext'

const TrackingOrders = () => {


    const { user } = useUser()

    const [search, setSearch] = useState("")

    const [orders, setOrders] = useState([])
    const [Load, setLoad] = useState(false)
    const [info, setInfo] = useState({ name: "" })
    const [date, setDate] = useState(0)
    const [ID, setID] = useState(0)
    const [month ,setMonth] = useState(0)



    // const getOrders = async (isMounted) => {


    //     var ID = user.numberOrder
    //     var getOrders = []



    //     while (ID >= 20254000) {



    //         try {

    //             const formData = new FormData()
    //             formData.append('tracking-number', `${user.name}${ID}`)


    //             const res = await axios.post(`https://api.ozonexpress.ma/customers/49800/05109d-8ee439-0d3c48-61315f-6b77d1/tracking`, formData)





    //             if (res.data.TRACKING.RESULT == "ERROR") {
    //                 console.log("error")
    //             } else {
    //                 console.log("seccessfylly")
    //                 try {
    //                     const res2 = await axios.post(`https://api.ozonexpress.ma/customers/49800/05109d-8ee439-0d3c48-61315f-6b77d1/parcel-info`, formData)
    //                     // console.log("res2", res2)
    //                     // setOrders(per=>([...per , {...res.data.TRACKING.LAST_TRACKING , ...res2.data["PARCEL-INFO"]}]))
    //                     //   orderGet.push({ ...res.data.TRACKING.LAST_TRACKING,...res.data.TRACKING.HISTORY, ...res2.data["PARCEL-INFO"] })
    //                     // console.log({ ...res.data.TRACKING.LAST_TRACKING, ...res.data.TRACKING.HISTORY, ...res2.data["PARCEL-INFO"] })
    //                     const data = { ...res.data.TRACKING.LAST_TRACKING, ...res.data.TRACKING.HISTORY, ...res2.data["PARCEL-INFO"] }
    //                     getOrders.push(data)
    //                     // orders.push(data)

    //                 } catch (error) {
    //                     console.log(error.message)
    //                     console.log("error.message")
    //                 }


    //             }

    //             ID = ID-1

    //             console.log(isMounted)

    //             if (!isMounted){
    //                 ID=20254000
    //             };

    //         } catch (error) {
    //             console.log(error.message)
    //             console.log("error.message")
    //         }

    //         console.log(ID)
    //         setOrders([...getOrders])

    //     }


    // }


    useEffect(() => {
        console.log(ID)
        setDate(new Date(user?.createdAt).getMonth() + 1)



        const isMounted = { current: true }; // ✅ مرجعية

        const getOrders = async () => {
            // console.log(user)
            console.log(ID)
            let getOrdersList = [];
            let min = 0
            let id = 0


            if(ID == 0){
                id =user?.numberOrder
            }else{
                id = ID
            }
            

            if(ID == 0){
                 min = parseInt("20250"+user?.numberOrder[5]+"011000")
            }else{
                 min = parseInt("20250"+month+"011000")
            }

            console.log(min)

            // if(user?.name == "ibtissam" || user?.name == "maryam" ){
            //   min = 20254000
            // }else{
            //   min=3000
            // }

            while (id >= min) {
                if (!isMounted.current) break; // ✅ توقف عند تفكيك المكون

                try {
                    const formData = new FormData();
                    formData.append('tracking-number', `${user.name}${id}`);

                    const res = await axios.post(
                        `https://api.ozonexpress.ma/customers/${user.id}/${user.secretKey}/tracking`,
                        formData
                    );

                    if (res.data.TRACKING.RESULT !== "ERROR") {
                        const res2 = await axios.post(
                            `https://api.ozonexpress.ma/customers/${user.id}/${user.secretKey}/parcel-info`,
                            formData
                        );

                        const data = {
                            ...res.data.TRACKING.LAST_TRACKING,
                            ...res.data.TRACKING.HISTORY,
                            ...res2.data["PARCEL-INFO"],
                        };

                        getOrdersList.push(data);
                    }

                    // console.log("seccessfylly")

                    // console.log(getOrdersList)



                    id--;
                    setOrders([...getOrdersList]);
                } catch (error) {
                    console.log("Error:", error.message);
                }
            }
        };

        getOrders();


        return () => {
            isMounted.current = false; // ✅ عند الخروج من المكون
        };
    }, [user,ID]);


    const chnageDate = async ({ target }) => {
        const infoMonth = {
            user: user?._id,
            month:target?.value
        }
        const res = await axios.get("/api/date/",{ params: infoMonth });

        console.log(res.data)

        const numIDd = `20250${target?.value}011`+res?.data[0]?.numberOrder
        // console.log(numIDd)
        setMonth(res?.data[0]?.month)
        setID(parseInt(numIDd))

    }


    return (
        <div className=''>
            <div className="flex justify-between p-[1rem] pt-[5rem] items-center">
                <h1>Tracking Orders</h1>

                <select className="max-h-max p-1" onChange={chnageDate}>
                    {(() => {
                        const options = [];
                        // القيمة النهائية لي بغيتي توصل ليها
                        for (let i = user?.numberOrder[5]; i >= date; i--) {
                            options.push(
                                <option key={i} value={i}>
                                    {i}/2025
                                </option>
                            );
                        }
                        return options;
                    })()}
                </select>
            </div>

            <div className='p-4  '>
                <input type="text" onChange={({ target }) => { setSearch(target.value) }} value={search} placeholder='Search by Number Phone ' className='mb-4 w-full text-[14px] h-[2rem] rounded-md pl-4 outline-none border-[1px] border-orange-300' />

                <div className='flex flex-col gap-4'>
                    {
                        orders.filter(item => item["INFOS"]?.["PHONE"].includes(search)).map((item, index) => {

                            let phone = "";

                            for (let i = 2; i < 20; i++) {
                                const statut = String(item[`${i}`]?.STATUT);
                                if (statut === "Mise en distribution" || statut === "Programmé") {
                                    // console.log(item["INFOS"]["TRACKING-NUMBER"] ,"OK")
                                    const comment = item[`${i}`]["COMMENT"];
                                    const match = comment.match(/(?:\bTéléphone[: ]*<\/?b>?\s*|\bTéléphone[: ]*)?(?:\+212|0)[\d\s\-]{8,}/i);
                                    phone = match ? match[0].replace(/[^+\d]/g, '') : "";
                                    break;
                                }
                            }
                            // console.log(item["INFOS"]["TRACKING-NUMBER"],phone,phone?.match(/(?:\+212|0)[\s-]?\d(?:[\s-]?\d){8}/)?.[0],phone?.match(/(?:\+212|0)[\s-]?\d(?:[\s-]?\d){8}/))

                            return <div key={index} className='w-full bg-white rounded-md p-4 border-[1px] border-orange-300 '>
                                <table>
                                    <thead>
                                        <tr>
                                            <td>ID</td>
                                            <td className='w-[20px] text-center'>:</td>
                                            <td>{item["INFOS"]["TRACKING-NUMBER"]}</td>
                                        </tr>
                                        <tr>
                                            <td>Name Client </td>
                                            <td className='w-[20px] text-center'>:</td>
                                            <td>{item["INFOS"]["RECEIVER"]}</td>
                                        </tr>
                                        <tr>
                                            <td>Phone </td>
                                            <td className='w-[20px] text-center'>:</td>
                                            <td>{item["INFOS"]["PHONE"]}</td>
                                        </tr>
                                        <tr>
                                            <td>City </td>
                                            <td className='w-[20px] text-center'>:</td>
                                            <td>{item["INFOS"]["CITY_NAME"]}</td>
                                        </tr>
                                        <tr>
                                            <td>Address </td>
                                            <td className='w-[20px] text-center'>:</td>
                                            <td>{item["INFOS"]["ADDRESS"]}</td>
                                        </tr>
                                        <tr>
                                            <td>Name Product</td>
                                            <td className='w-[20px] text-center'>:</td>
                                            <td>{item["INFOS"]["NOTE"]}</td>
                                        </tr>
                                        <tr>
                                            <td>Price </td>
                                            <td className='w-[20px] text-center'>:</td>
                                            <td>{item["INFOS"]["PRICE"]} DH</td>
                                        </tr>



                                    </thead>
                                </table>

                                <hr className='h-[1px] bg-slate-500 mt-4' />

                                <div className='mt-4'>
                                    <p>Date : {item["1"]["TIME_STR"]}</p>
                                    <p className='flex'>Status :
                                        <span className={`px-2 text-[15px] rounded-md text-white 
                                        ${(item["STATUT"] == "Annulé" || item["STATUT"] == "Retourné" || item["STATUT"] == "Refusé" || item["STATUT"] == "Livré" || item["STATUT"] == "Nouveau Colis" || item["STATUT"] == "Mise en distribution") ? "" : "bg-yellow-600"} 
                                        ${(item["STATUT"] == "Annulé" || item["STATUT"] == "Retourné" || item["STATUT"] == "Refusé") && "bg-red-500"} 
                                        ${item["STATUT"] == "Mise en distribution" && "bg-blue-600"}
                                        ${item["STATUT"] == "Nouveau Colis" && "bg-blue-400"}
                                        ${item["STATUT"] == "Livré" && "bg-green-500"}`}
                                        >{item["STATUT"]} {item["TIME_STR"]} </span>
                                    </p>

                                    <p>
                                        Livreur : {phone?.match(/(?:\+212|0)[\s\-]?\d(?:[\s\-]?\d){8}/)}
                                    </p>
                                    <p>
                                        {/* {(item["STATUT"] == "Annulé" || item["STATUT"] == "Retourné" || item["STATUT"] == "Refusé" ) && item["COMMENT"]} */}
                                        {(item["STATUT"] != "Mise en distribution" && item["STATUT"] != "Nouveau Colis" && item["STATUT"] != "Livré" && item["STATUT"] != "Attente De Ramassage" && item["STATUT"] != "Reçu") && item["COMMENT"]}
                                    </p>

                                </div>

                            </div>
                        })
                    }
                </div>



            </div>




        </div>
    )
}

export default TrackingOrders
