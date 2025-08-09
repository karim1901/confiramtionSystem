import Seller from "@/models/seller";
import { connectDB } from "@/utils/connectDB";

connectDB()

export async function GET(request, { params }) {
      try {
    
        const { id } = params
    
        const seller = await Seller.findById({ _id: id })

        // console.log(seller)
    
        return NextResponse.json(seller);
      } catch (error) {
        console.log({ message: error.message })
        
        return NextResponse.json({ message: error.message });
    }
}