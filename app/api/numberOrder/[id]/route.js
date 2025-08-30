
import User from "@/models/user";
import { connectDB } from "@/utils/connectDB";
import { NextResponse } from "next/server";

export const dynamic = "dynamic-force";

connectDB()

export async function GET(request, { params }) {
  try {

    const { id } = params

    const num = await User.findById({ _id: id })

    return NextResponse.json(num);
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}




export async function PUT(request, { params }) {
  try {
    const { id } = params

    const data = await request.json()

    console.log(id,data)


    await User.updateOne({ _id: id }, { numberOrder: data.numberOrder })

    return NextResponse.json("successfly");

  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}



// export const PUT = async (request, { params }) => {

//   try {
//     // const verificationResult = await verifyToken(request);
//     // if (verificationResult instanceof NextResponse) {
//     //   return verificationResult; // This is an error response
//     // }

//     const body = await request.json()

//     console.log(body)
//     const user = await User.updateMany({store:body.storeName},{seller:body.seller})
//     return NextResponse.json({ message: "update successfully ", user })

//   } catch (error) {
//     return NextResponse.json({ message: error.message })
//   }

// } 