
import User from "@/models/user";
import { connectDB } from "@/utils/connectDB";
import { NextResponse } from "next/server";

export const dynamic = "dynamic-force";

connectDB()

export async function GET(request, { params }) {
  try {
    
    const { id } = params

    const num = await User.findById({_id:id})

    return NextResponse.json(num);
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}




export async function PUT(request, { params }) {
    try {
      const { id } = params

      const data = await request.json()
      
  
      await User.updateOne({_id:id},{numberOrder:data.numberOrder})
  
      return NextResponse.json("successfly");

    } catch (error) {
      return NextResponse.json({ message: error.message });
    }
  }