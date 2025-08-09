"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const SellerContext = createContext(null);

export const SellerProvider = ({ children }) => {
  const [seller, setSeller] = useState(null);
  const router = useRouter();
  const [team, setTeam] = useState([])
  const [orders, setOrders] = useState([])
  const [statistics ,setStatistics] = useState({
      livre: [],
      retour: [],
      progress: []
    })

  useEffect(() => {
    const token = localStorage.getItem('token')?.replace(/^"(.*)"$/, '$1');

    verifyToken(token)
  }, []);

  useEffect(() => {
    let ORDERS = []

    // setOrders([])

    let STATISTICS = {
      livre: [],
      retour: [],
      progress: []
    }

    seller?.users.map(async (user) => {
      setTeam([...team, user])

      const getOrders = async () => {

        // let min = 202508011001

        let ID = user?.numberOrder

        while (ID >= 202508011000) {


          try {
            const formData = new FormData();
            formData.append('tracking-number', `${user.name}${ID}`);

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

              ORDERS.push(data)


              if (data["STATUT"] == "Livré") {
                STATISTICS.livre.push(data)
              }
              if (data["STATUT"] == "Annulé" || data["STATUT"] == "Retourné" || data["STATUT"] == "Refusé") {
                STATISTICS.retour.push(data)
              }


              if (data["STATUT"] != "Annulé" && data["STATUT"] != "Retourné" && data["STATUT"] != "Refusé" && data["STATUT"] != "Livré") {
                STATISTICS.progress.push(data)
              }

            }

            // console.log("successful",ORDERS)

            ID--;


          } catch (error) {
            console.log("Error:", error.message);
          }
        }



        setOrders([...orders, ...ORDERS])
        setStatistics({...STATISTICS})

      }

      getOrders()
    })

    console.log(seller)

  }, [seller])








  const verifyToken = (token) => {
    axios.post('/api/verifyToken', { token: token }).then(res => {
      setSeller(res.data.user)
    }).catch((error) => {
      console.log(error.message)
      router.push("/seller")
    })

  }


  //   useEffect(()=>{console.log(user)},[user])
  return (
    <SellerContext.Provider value={{ seller, setSeller, orders ,statistics }}>
      {children}
    </SellerContext.Provider>
  );
};

export const useSeller = () => {
  const context = useContext(SellerContext);
  if (context === undefined) {
    throw new Error("useSeller must be used within a SellerProvider");
  }
  return context;
};
