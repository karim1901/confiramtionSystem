import mongoose from "mongoose";


export const connectDB = ()=>{
    mongoose.connect(process.env.MONGODB_URI).then(()=>{
        console.log("connect db successfully ")
    }).catch(err=>{
        console.log("failed connect with db ",err.message)
    })
}