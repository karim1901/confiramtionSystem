import mongoose from "mongoose";

const { Schema } = mongoose;

const sellerSchema = new Schema({
    fullName: {
        type: String,
        required: true  // ← صحح spelling
    },
    storeName: {        // ← غيّر الحقل ليطابق البيانات التي تُرسلها في signup
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true   // ← يُفضل جعله unique
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });









sellerSchema.virtual("users", {
    ref: "user",
    localField: "_id",
    foreignField: "seller",
  });
  
  sellerSchema.set("toObject", { virtuals: true });
  sellerSchema.set("toJSON", { virtuals: true });
// ⚠️ Name يجب أن يكون مطابق تماماً: Seller (بـ Capital S)
const Seller = mongoose.models.seller || mongoose.model("seller", sellerSchema);

export default Seller;
