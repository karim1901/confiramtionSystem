'use client'
import React from 'react'
import { useSeller } from '../../_context/sellerContext'

const page = () => {
    const { seller,orders ,statistics } = useSeller()

    return (
        <div className='p-4'>
            <h1 className=''>Progress</h1>
            <div className='flex flex-col gap-4 mt-4'>
                {
                    seller?.users.map((user) => {

                        return statistics.progress.filter((item) => item["INFOS"]?.["TRACKING-NUMBER"].includes(user.name)).map((item, index) => {

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
                                        {(item["STATUT"] != "Mise en distribution" && item["STATUT"] != "Nouveau Colis" && item["STATUT"] != "Livré" && item["STATUT"] != "Attente De Ramassage" && item["STATUT"] != "Reçu") && item["COMMENT"]}
                                    </p>

                                </div>

                            </div>
                        })

                    })

                }
            </div>

        </div>
    )
}

export default page
