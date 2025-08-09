import Seller from "@/models/seller";
import { connectDB } from "@/utils/connectDB";
import { verify } from "jsonwebtoken";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import User from "@/models/user";

connectDB()

const SECRET_KEY = process.env.JWT_SECRET || 'mysecretkey';


export async function POST(request) {
    try {
      // Parse the request body
      const { token } = await request.json();
  
      if (!token) {
        return NextResponse.json(
          { message: 'Token not found', status: false },
          { status: 400 } // Bad Request
        );
      }
  
      // console.log(token)
      // Verify the token
      const decoded = verify(token, SECRET_KEY);
  
    // //   // Fetch the user by ID
      const user = await Seller.findById(decoded.user._id).populate("users");
  
      if (!user || user.status == "block" ) {
        return NextResponse.json(
          { message: 'Invalid token', status: false },
          { status: 401 } // Unauthorized
        );
      }
  
      // Return user data
      return NextResponse.json(
        { user },
        { status: 200 } // OK
      );
    } catch (error) {
      console.error("Error in POST request:", error); // Log the error for debugging
      return NextResponse.json(
        { message: error.message, status: false },
        { status: 500 } // Internal Server Error
      );
    }
  }
  