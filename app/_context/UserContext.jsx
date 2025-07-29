'use client'

import { useRouter } from "next/navigation"
import { createContext, useContext, useEffect, useState } from "react"


const UserContext = createContext()


export const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const router = useRouter()

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }


    }, []);


    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));

        } else {
            localStorage.removeItem('user');
            // router.push("/")
        }

        console.log(user)
    }, [user]);





    return <UserContext.Provider value={{ user, setUser }}>
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