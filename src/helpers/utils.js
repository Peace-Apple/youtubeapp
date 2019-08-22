import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default class Utils {
  static generateToken(payload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
    return token;
  }
}
