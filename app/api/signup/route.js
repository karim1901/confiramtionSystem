import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import Seller from '@/models/seller';
import { connectDB } from '@/utils/connectDB';

connectDB()


export async function POST(req) {
  const sellerData = await req.json();

  console.log(sellerData)

  // Hash password
  const hashedPassword = await bcrypt.hash(sellerData.password, 10);
  sellerData.password = hashedPassword

  // console.log(sellerData)

  const save = Seller.create(sellerData)


  // Save user to DB (for demo, using localStorage in frontend. In real app: DB)
  // Return success response
  return NextResponse.json({ message: 'User registered successfully', user: save});
}
