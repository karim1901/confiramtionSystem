import mongoose from "mongoose"


const {Schema} = mongoose


const userSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    numberOrder:{
        type:String,
        require:true
    },
    id:{
        type:Number,
        required:true
    },
    secretKey:{
        type:String,
        required:true
    }
},{timestamps:true})



const User = mongoose.models.User || mongoose.model("user",userSchema)


export default User