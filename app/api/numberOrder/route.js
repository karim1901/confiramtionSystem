
import User from "@/models/user";
import { connectDB } from "@/utils/connectDB";
import { NextResponse } from "next/server";




connectDB()

export async function POST(request) {

    try {

        const data = await request.json()
        data["numberOrder"]="202508011000"

        const user = await User.create(data)

        return NextResponse.json({message:"created successfully " ,user})
        
    } catch (error) {
        return NextResponse.json({message:error.message})
    }    
}



