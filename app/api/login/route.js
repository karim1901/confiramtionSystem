
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Seller from '@/models/seller';
import { connectDB } from '@/utils/connectDB';
import User from '@/models/user';

connectDB()

const SECRET_KEY = process.env.JWT_SECRET || 'mysecretkey';


export async function POST(req) {
  const { email, password } = await req.json();
  // Fetch user from DB (demo purpose)
  // In real app: fetch user from DB
  console.log(email)

  const storedUser = await Seller.findOne({email:email}).populate("users");


  if (email !== storedUser.email) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  const isMatch = await bcrypt.compare(password, storedUser.password);

  if (!isMatch) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  // Create JWT Token
  const token = jwt.sign({user:storedUser}, SECRET_KEY, { expiresIn: '7d' });

  const response = NextResponse.json({ message: 'Login successful' ,token:token, user:storedUser});
  response.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });

  return response;
}



