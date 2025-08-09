
import Seller from '@/models/seller';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'mysecretkey';

// ✅ دالة للتحقق من صحة JWT وارجاع بيانات المستخدم
export const verifyToken = async(token) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    const seller = await Seller.findById(decoded.user._id);
  
    if (!seller ) {
        return { valid: false, payload: decoded };
    }


    return { valid: true, payload: decoded };
  } catch (error) {
    console.error('Invalid Token:', error);
    return { valid: false, payload: null };
  }
};