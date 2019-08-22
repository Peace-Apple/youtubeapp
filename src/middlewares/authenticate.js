import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import models from '../database/models';

dotenv.config()

const authenticate = async(req, res, next) => {
  try {
    const token = req.headers.authorization || req.body.token || req.query.token;
    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await models.User.findOne({
        where: {id: decodedData.id, username: decodedData.username}
      })
    req.token = token
    req.user = user
    next()
  } catch (error) {
    res.status(401).json(
      {
        success: false,
        error: 'Token is invalid, you need to provide a valid token'
      }
    )
  }
}

export default authenticate;
