import models from '../database/models';

export default class UserController {
  static async registerUser (req, res) {
      const { username, email, password } = req.body;

      try {
        const newUser = await models.User.create(
            {
                username: username,
                email: email,
                password: password
            }
        )

        return res.status(201).json(
            {
                success: true,
                message: 'Successfully created an account',
                user: newUser
            }
        )
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
          const allUsers = await models.User.findAll();
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
        const user = await models.User.findByPk(userId); 
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
