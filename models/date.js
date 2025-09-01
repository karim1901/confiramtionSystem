import mongoose from "mongoose";

const {Schema} = mongoose 

const schemaDate = new Schema({
    user: { // ← هذا هو المرجع الجديد
        type: mongoose.Schema.Types.ObjectId,
        ref: "user", // ← اسم الموديل المرتبط
        required: true
    },
    month: {
        type:Number,
        required:true
    },
    numberOrder:{
        type:Number,
        required:true
    }

}, { timestamps: true })

const Date = mongoose.models.date || mongoose.model("date", schemaDate);


export default Date