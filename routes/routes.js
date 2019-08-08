const express = require('express')
const router = express.Router()
const models = require('../models')

// Get all subscribers
router.get('/', async (req, res) => {
  try {
    const subscribers = await models.Subscriber.findAll();
    return res.status(200).json(
      {
        success: true,
        message: 'Successfully got all subscribers',
        subscribers: subscribers
      }
    );
  } catch(err) {
    return res.status(500).json(
      { 
        success: false,
        message: err.message 
      }
    );
  }
})

// Get one subscriber
router.get('/:id', getSubscriber, (req, res) => {
  res.status(200).json(
    {
      sucess: true,
      message: 'Successfully got subscriber',
      subscriber: res.subscriber
    }
  )
})

// Create one subscriber
router.post('/', async (req, res) => {
  const { name, subscribedChannel } =req.body;
  const newSubscriber = await models.Subscriber.create(
    {
      name: name,
      subscribedChannel: subscribedChannel
    }
  );

//   console.log('omupya', newSubscriber);
  try {
    return res.status(201).json(
      {
        success: true,
        message: 'Successfully created a subscriber',
        newSubscriber: newSubscriber
      }
    );
  } catch (err) {
    res.status(400).json(
      { 
        success: false,
        message: err.message
      }
    );
  }
})

// Update one subscriber
router.patch('/:id', getSubscriber, async (req, res) => {
  const { name, subscribedChannel } = req.body;
  let updatedSubscriber;
  if (name != null && subscribedChannel != null) {
    updatedSubscriber = await res.subscriber.update(
      {
        name: name,
        subscribedChannel: subscribedChannel
      }
    )
  }

  try {
    res.status(202).json(
      {
        success: true,
        message: 'Successfully updated subscriber',
        updatedSubscriber: updatedSubscriber
      }
    )
  } catch {
    res.status(400).json(
      { 
        success: false,
        message: err.message 
      }
    )
  }
})

// Delete one subscriber
router.delete('/:id', getSubscriber, async (req, res) => {
  try {
    await res.subscriber.destroy()
    res.json(
      { 
        success: true,
        message: 'Successfully deleted subscriber' 
      }
    )
  } catch(err) {
    res.status(500).json(
      { 
        success: false,
        message: err.message
      }
    )
  }
})

async function getSubscriber(req, res, next) {
  const subscriberId = req.params.id;
  try {
    const subscriber = await models.Subscriber.findByPk(subscriberId)
    if (subscriber == null) {
      return res.status(404).json(
        { 
          success: false,
          message: 'Can not find subscriber'
        }
      )
    }
    res.subscriber = subscriber
  } catch(err){
    return res.status(500).json(
      { 
        success: false,
        message: err.message 
      }
    )
  }
  
  next()
}

module.exports = router
