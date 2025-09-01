
import { connectDB } from "@/utils/connectDB";
import { NextResponse } from "next/server";
import Date from "@/models/date";



connectDB()

export async function POST(request) {

    try {

        const data = await request.json()

        const date = await Date.create(data)

        return NextResponse.json({message:"created successfully " ,date})
        
    } catch (error) {
        return NextResponse.json({message:error.message})
    }    
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const user = searchParams.get("user");
    const month = searchParams.get("month");


    const num = await Date.find({ user: user , month:month })

    // console.log(month,num)

    return NextResponse.json(num);
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}

