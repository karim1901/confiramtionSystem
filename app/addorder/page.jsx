'use client'
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { useUser } from '../_context/UserContext';
import toast from 'react-hot-toast';


const AddOrder = () => {

    const { user, setUser } = useUser()

    const [cities, setCities] = useState([]);
    const [selectedCities, setSelectedCities] = useState(null);
    const [loade, setLoade] = useState(false)
    const [order, setOrder] = useState({
        "parcel-receiver": "",
        "parcel-phone": "",
        "parcel-city": "",
        "parcel-address": "",
        "parcel-note": "",
        "parcel-price": "",
        "parcel-nature": ""
    });
    const [errors, setErrors] = useState({});

    const router = useRouter()




    const incNum = async () => {
        try {
            const numTrac = await axios.put(`/api/numberOrder/${user._id}`, { numberOrder: +user.numberOrder + 1 })
            console.log("inc Seccessfully")
            ////////////////
            const res = await axios.get(`/api/numberOrder/${user._id}`)

            setUser(res.data)

        } catch (error) {

            console.log("message", error.message)
        }
    }




    const validateInputs = () => {
        const newErrors = {};

        if (!order["parcel-receiver"].trim()) newErrors["parcel-receiver"] = "Receiver's name is required.";

        if (!order["parcel-phone"].trim() || !/^(06|07)\d{8}$/.test(order["parcel-phone"])) {
            newErrors["parcel-phone"] = "Phone must start with 06 or 07 and be 10 digits.";
        }

        if (!order["parcel-city"]) newErrors["parcel-city"] = "City selection is required.";

        if (!order["parcel-address"].trim()) newErrors["parcel-address"] = "Address is required.";

        if (!order["parcel-price"].trim() || isNaN(order["parcel-price"])) {
            newErrors["parcel-price"] = "Price must be a number.";
        }

        if (!order["parcel-nature"].trim()) newErrors["parcel-nature"] = "Product nature is required.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const sendOrder = async () => {
        setLoade(true)
        if (!validateInputs()) {
            setLoade(false)
            return;
        }

        try {
            const formData = new FormData();
            formData.append("parcel-receiver", order["parcel-receiver"]);
            formData.append("parcel-phone", order["parcel-phone"]);
            formData.append("parcel-city", order["parcel-city"]);
            formData.append("parcel-address", order["parcel-address"]);
            formData.append("parcel-note", order['parcel-nature']);
            formData.append("parcel-price", order["parcel-price"]);
            formData.append("parcel-nature", order["parcel-nature"]);
            formData.append("tracking-number", `${user.name}${user.numberOrder}`);

            console.log(formData)

            const response = await axios.post(
                `https://api.ozonexpress.ma/customers/${user.id}/${user.secretKey}/add-parcel`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            console.log("Order sent successfully:", response.data);



            if (response.data["ADD-PARCEL"].CUSTOMER.RESULT == "ERROR" || response.data["ADD-PARCEL"].RESULT == "ERROR" || response.data["CHECK_API"].RESULT == "ERROR") {
                toast.error("error created field .")
            } else {
                console.log("Ssssss")
                toast.success("complet order seccessfully .")
            }
            setOrder({
                "parcel-receiver": "",
                "parcel-phone": "",
                "parcel-city": "",
                "parcel-address": "",
                "parcel-note": "",
                "parcel-price": "",
                "parcel-nature": ""
            });
            setSelectedCities(null);
            setErrors({});
            incNum()
            setLoade(false)

        } catch (error) {
            toast.error("error? go to page home and back")
            console.error("Error sending order:", error);
            setLoade(false)

        }
    };




    const getCities = async () => {
        try {
            const res = await axios.get("https://api.ozonexpress.ma/cities");
            const cityOptions = Object.keys(res.data.CITIES).map((key) => ({
                value: res.data.CITIES[key].ID,
                label: res.data.CITIES[key].NAME
            }));
            setCities(cityOptions);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        getCities();
    }, []);


    const handleCityChange = (selectedOption) => {

        setSelectedCities(selectedOption);

        setOrder({
            ...order,
            'parcel-city': selectedOption?.value || ""
        });

    };


    return (
        <div>

            <h1 className='p-[1rem]'>Add Order</h1>

            <form action="" className='w-full px-[1rem] flex flex-col gap-[.7rem]'>

                <input
                    type="text"
                    className='w-full h-[2.2rem] pl-[1rem] outline-none border-[1px] border-[orange] rounded-sm'
                    placeholder='Name Client'
                    value={order['parcel-receiver']}
                    onChange={(e) => setOrder({ ...order, 'parcel-receiver': e.target.value })}
                />
                {errors["parcel-receiver"] && <p className="text-red-500">{errors["parcel-receiver"]}</p>}

                <input
                    type="text"
                    className='w-full h-[2.2rem] pl-[1rem] outline-none border-[1px] border-[orange] rounded-sm'
                    value={order['parcel-phone']}
                    placeholder='Phone'
                    onChange={(e) => setOrder({ ...order, 'parcel-phone': e.target.value })}

                />
                {errors["parcel-phone"] && <p className="text-red-500">{errors["parcel-phone"]}</p>}


                <Select
                    instanceId="city-select"
                    options={cities}
                    value={selectedCities}
                    onChange={handleCityChange}
                    placeholder="Search city"
                    className="basic-single-select text-black"
                    classNamePrefix="select"
                    styles={{
                        control: (provided) => ({
                            ...provided,
                            borderColor: 'orange',
                            boxShadow: 'none',
                            '&:hover': { borderColor: 'orange' },
                            color: 'black'
                        })
                    }}

                />
                {errors["parcel-city"] && <p className="text-red-500">{errors["parcel-city"]}</p>}

                <input
                    className='w-full h-[2.2rem] pl-[1rem] outline-none border-[1px] border-[orange] rounded-sm'
                    type="text"
                    value={order['parcel-address']}
                    placeholder='Address'
                    onChange={(e) => setOrder({ ...order, 'parcel-address': e.target.value })}
                />
                {errors["parcel-address"] && <p className="text-red-500">{errors["parcel-address"]}</p>}

                <input
                    className='w-full h-[2.2rem] pl-[1rem] outline-none border-[1px] border-[orange] rounded-sm'
                    type="text"
                    value={order['parcel-price']}
                    placeholder='Price'
                    onChange={(e) => setOrder({ ...order, 'parcel-price': e.target.value })}
                />
                {errors["parcel-price"] && <p className="text-red-500">{errors["parcel-price"]}</p>}

                <input
                    className='w-full h-[2.2rem] pl-[1rem] outline-none border-[1px] border-[orange] rounded-sm'
                    placeholder='Name Product'
                    type="text"
                    value={order['parcel-nature']}
                    onChange={(e) => setOrder({ ...order, 'parcel-nature': e.target.value })}
                />
                {errors["parcel-nature"] && <p className="text-red-500">{errors["parcel-nature"]}</p>}

                <button type='button' className='text-white bg-black p-[.7rem] rounded-md' onClick={sendOrder} >Send Order</button>
            </form>

        </div>
    )
}

export default AddOrder
