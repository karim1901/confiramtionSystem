'use client'

import axios from "axios"
import { useRouter } from "next/navigation"
import { createContext, useContext, useEffect, useState } from "react"


const UserContext = createContext()


export const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const router = useRouter()

    const [orders, setOrders] = useState({
        livre: 0,
        order: 0,
        retour: 0
    })

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }


    }, []);


    useEffect(() => {
        if (user) {
            const VerifyID = async () => {

                try {
                  const res = await axios.get(`/api/numberOrder/${user._id}`)
            
                  setUser(res.data)
            
                  console.log(res.data)
            
                  router.push("/TrackingOrders")
            
            
                } catch (error) {
                  console.log(error.message)
                }
            
            
              }

              VerifyID()
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
            router.push("/")
        }
    }, [user]);


    useEffect(() => {

        // let i =1

        const isMounted = { current: true }; // ✅ مرجعية

        const getOrders = async () => {
            // console.log(user)
            let ID = user?.numberOrder;
            let getOrdersList = {
                livre: 0,
                order: 0,
                retour: 0,
                one : 0,
                tow: 0,
                three: 0,
                four: 0,
            }

            let livre= 0
            let total= 0
            let retour= 0

            let one = 0
            let tow= 0
            let three= 0
            let four= 0


            let min = 0

            if(user?.name == "ibtissam" || user?.name == "maryam" ){
              min = 20254000
            }else{
              min=3000
            }
        
            while (ID >= min) {
                if (!isMounted.current) break; // ✅ توقف عند تفكيك المكون
                // console.log(i++)
                try {
                    const formData = new FormData();
                    formData.append('tracking-number', `${user.name}${ID}`);

                    const res = await axios.post(
                        `https://api.ozonexpress.ma/customers/49800/05109d-8ee439-0d3c48-61315f-6b77d1/tracking`,
                        formData
                    );

                    if (res.data.TRACKING.RESULT !== "ERROR") {
                        const res2 = await axios.post(
                            `https://api.ozonexpress.ma/customers/49800/05109d-8ee439-0d3c48-61315f-6b77d1/parcel-info`,
                            formData
                        );

                        const data = {
                            ...res.data.TRACKING.LAST_TRACKING,
                            ...res.data.TRACKING.HISTORY,
                            ...res2.data["PARCEL-INFO"],
                        };

                        // getOrdersList={
                        //     livre:getOrdersList.livre,
                        //     order:getOrdersList.order,
                        //     retour:getOrdersList.retour
                        // };

                        // if (data["STATUT"] == "Livré") {
                            // console.log(data["STATUT"] == "Livré")
                            if(data["STATUT"] == "Livré"){
                                livre++
                            }
                            if(data["STATUT"] == "Annulé" || data["STATUT"] == "Retourné" || data["STATUT"] == "Refusé"){
                                retour++
                            }

                            // console.log(data["INFOS"]["PRICE"])

                            if(data["INFOS"]["PRICE"] < 350){
                                one++
                            }
                            if(data["INFOS"]["PRICE"] > 350 && data["INFOS"]["PRICE"]  <= 500){
                                tow++
                            }
                            if(data["INFOS"]["PRICE"] >= 550 && data["INFOS"]["PRICE"] <= 750 ){
                                three++
                            }

                            if(data["INFOS"]["PRICE"] > 750  ){
                                four++
                            }


                            total ++


                            

                        //     getOrdersList.livre = getOrdersList.livre + 1
                        // }


                    }

                    // console.log("seccessfylly")

                    ID--;
                    setOrders({
                        livre:livre,
                        order:total,
                        retour:retour,
                        one : one,
                        tow: tow,
                        three: three,
                        four: four,
                    });

                    // console.log(getOrdersList)



                } catch (error) {
                    console.log("Error:", error.message);
                }
            }
        };

        getOrders();

        return () => {
            isMounted.current = false; // ✅ عند الخروج من المكون
        };
    }, [user]);






    return <UserContext.Provider value={{ user, setUser, orders }}>
        {children}
    </UserContext.Provider>
}



export const useUser = () => {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error("useUser must be used within a UserProvider")
    }

    return context

}