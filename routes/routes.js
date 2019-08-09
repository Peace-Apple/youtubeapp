import express from 'express';
import SubscriberController from '../controllers/subscriberController';

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
