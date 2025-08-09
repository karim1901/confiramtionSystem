import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    numberOrder: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    secretKey: {
        type: String,
        required: true
    },
    store: {
        type: String,
        required: true
    },
    seller: { // ← هذا هو المرجع الجديد
        type: mongoose.Schema.Types.ObjectId,
        ref: "seller", // ← اسم الموديل المرتبط
        required: true
    }
}, { timestamps: true });

const User = mongoose.models.user || mongoose.model("user", userSchema);

export default User;
