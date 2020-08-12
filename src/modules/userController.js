import models from '../database/models';
import bcrypt from 'bcrypt';
import Utils from '../helpers/utils';
import Validator from '../middlewares/validator';

export default class UserController {
  static async registerUser (req, res) {
    const { username, email, password } = req.body;
    const { isEmail, validatePassword } = Validator;
    const { generateToken } = Utils;
    if (!isEmail(email)) {
      return res.status(400).json(
        {
          success: false,
          message: 'Email must be a valid email address'
        }
      )
    }

    if (!validatePassword(password)) {
      return res.status(400).json(
        {
          success: false,
          message: 'Password must contain one upper case, one lowercase, one numeric character, a symbol and be atleast 8 characters long'
        }
      )
    }
    
    try {
      const user = await models.User.findOne({
        where: {
          email
        }
      });
      if(user) {
        return res.status(409).json({
          success: false,
          message: 'User already registered'
        })
      }
      bcrypt.hash(password, 10, async (err, hash) => {
        const newUser = await models.User.create(
          {
            username: username,
            email: email,
            password: hash
          }
        )
        
        const payload = { id: newUser.id, username: newUser.username, email: newUser.email };
        const token = generateToken(payload);
        return res.status(201).json(
          {
            success: true,
            message: 'Successfully created an account',
            user: {
              id: newUser.id,
              username: newUser.username,
              email: newUser.email,
              createdAt: newUser.createdAt,
              updatedAt: newUser.updatedAt,
              token: token
            }
          }
        )
      });
    } catch (error) {
      return res.status(400).json(
        {
          success: false,
          message: 'Something went wrong, please try again'
        }
      )
    }
  }

  static async loginUser (req, res) {
    const { email, password } = req.body;
    const { isEmail } = Validator;
    const { generateToken } = Utils;
    
    if (!isEmail(email)) {
      return res.status(400).json(
        {
          success: false,
          message: 'Email must be a valid email address'
        }
      )
    }

    try {
      const user = await models.User.findOne({
        where: {
          email
        }
      });
      if(!user) {
        return res.status(404).json(
          {
            success: false,
            message: 'Sorry, user does not exist'
          }
        )
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if(!passwordMatch) {
        res.status(401).json(
          {
            success: false,
            message: 'Passwords do not match!'
          }
        )
      } else {
        const payload = { id: user.id, username: user.username, email: user.email };
        const token = generateToken(payload);
        res.status(401).json(
          {
            success: true,
            message: 'You have successfully logged in',
            token: token
          }
        )
      }

    } catch (error) {
      return res.status(400).json(
        {
          success: false,
          message: 'Something went wrong, please try again'
        }
      )
    }
  }

  static async getAllUsers (req, res) {
    try {
      const allUsers = await models.User.findAll(
        {
          attributes: ['id', 'username', 'email', 'createdAt', 'updatedAt']
        }
      );
      return res.status(200).json(
        {
          success: true,
          message: 'Successfully got all users',
          users: allUsers
        }
      )
    } catch (error) {
      return res.status(500).json(
        {
          success: false,
          message: error.message
        }
      )
    }
  }

  static async getUser (req, res, next) {
    const userId = req.params.id;
  
    try {
      const user = await models.User.findByPk(userId,
        {
          attributes: ['id', 'username', 'email', 'createdAt', 'updatedAt']
        }
        ); 
      if (user === null) {
        return res.status(404).json(
          {
            success: false,
            message: 'Can not find user'
          }
        )
      }
      res.user = user
    } catch (error) {
      return res.status(500).json(
        { 
          success: false,
          message: error.message 
        }
      )
    }
    next()
  }

  static async getOneUser (req, res) {
    return res.status(200).json(
      {
        success: true,
        message: 'Successfully got user',
        user: res.user
      }
    )
  }

  static async updateUser (req, res) {
    const { username, email } = req.body;
    let updatedUser;
    if (username != null && email != null) {
      updatedUser = await res.user.update(
        {
          username: username,
          email: email
        }
      )
    }
    
    try {
      res.status(200).json(
        {
          success: true,
          message: 'Successfully updated user',
          updatedUser: updatedUser
        }
      )
    } catch (err) {
      res.status(400).json(
        { 
          success: false,
          message: err.message 
        }
      )
    }
  }
      
  static async deleteUser (req, res) {
    try {
      await res.user.destroy()
      res.json(
        { 
          success: true,
          message: 'Successfully deleted user' 
        }
      )
    } catch (err) {
      res.status(500).json(
        { 
          success: false,
          message: err.message
        }
      )
    }
  }
}
