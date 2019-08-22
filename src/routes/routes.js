import express from 'express';
import { check } from 'express-validator';
import SubscriberController from '../modules/subscriberController';
import UserController from '../modules/userController';
import authenticate from '../middlewares/authenticate';

// define an express router
const router = express.Router()

const { 
  getAllSubscribers,
  getOneSubscriber,
  addSubscriber,
  updateSubscriber,
  deleteSubscriber,
  getSubscriber
} = SubscriberController;

const {
  registerUser,
  getAllUsers,
  getUser,
  getOneUser,
  updateUser,
  deleteUser,
  loginUser
} =UserController;

// Subscription routes
// Get all subscribers
router.get('/subscribers', 
  getAllSubscribers
)

// Get one subscriber
router.get('/subscribers/:id', 
  getSubscriber, 
  getOneSubscriber
)

// Create one subscriber
router.post('/subscribers', 
  [ 
    check('name').exists({ checkFalsy: true }).withMessage('Name is required')
      .isString().isLength({ min: 3 }).withMessage('Name should be atleast 3 characters long')
      .isAlpha().withMessage('Please use only alphabetical characters').trim(),
    check('subscribedChannel').exists({ checkFalsy: true }).withMessage('Channel is required').isString().trim(),
  ],
  addSubscriber
)

// Update one subscriber
router.patch('/subscribers/:id', 
  getSubscriber, 
  updateSubscriber
)

// Delete one subscriber
router.delete('/subscribers/:id', 
  getSubscriber, 
  deleteSubscriber
)

// User routes
// register user
router.post('/users/register',
  registerUser
)

// login user
router.post('/users/login',
  loginUser
)

// get all users
router.get('/users',
  authenticate,
  getAllUsers
)

//get one user
router.get('/users/:id',
  getUser,
  getOneUser
)

// Update one user
router.patch('/users/:id', 
  getUser,
  updateUser
)

// Delete one user
router.delete('/users/:id', 
  getUser, 
  deleteUser
)

export default router;
