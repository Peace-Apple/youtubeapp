import express from 'express';
import { check } from 'express-validator';
import SubscriberController from '../modules/subscriberController';

const router = express.Router()

const { 
  getAllSubscribers,
  getOneSubscriber,
  addSubscriber,
  updateSubscriber,
  deleteSubscriber,
  getSubscriber
} = SubscriberController;

// Get all subscribers
router.get('/', 
  getAllSubscribers
)

// Get one subscriber
router.get('/:id', 
  getSubscriber, 
  getOneSubscriber
)

// Create one subscriber
router.post('/', 
  [ 
    check('name').exists({ checkFalsy: true }).withMessage('Name is required')
      .isString().isLength({ min: 3 }).withMessage('Name should be atleast 3 characters long')
      .isAlpha().withMessage('Please use only alphabetical characters').trim(),
    check('subscribedChannel').exists({ checkFalsy: true }).withMessage('Channel is required').isString().trim(),
  ],
  addSubscriber
)

// Update one subscriber
router.patch('/:id', 
  getSubscriber, 
  updateSubscriber
)

// Delete one subscriber
router.delete('/:id', 
  getSubscriber, 
  deleteSubscriber
)

export default router;
