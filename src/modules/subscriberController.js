import models from '../database/models';
import { check, validationResult } from 'express-validator';

export default class SubscriberController {
  static async getAllSubscribers (req, res) {
    try {
      // using query property on request object
      // eg http://localhost:3005/api/v1/subscribers?id=5
      if (req.query.id) {
        res.send(`You have requested a subscriber with id ${req.query.id}`)
      }
      
      const subscribers = await models.Subscriber.findAll();
      return res.status(200).json(
        {
          success: true,
          message: 'Successfully got all subscribers',
          subscribers: subscribers
        }
      );
    } catch (err) {
      return res.status(500).json(
        { 
          success: false,
          message: err.message 
        }
      );
    }
  }
      
  static async getOneSubscriber (req, res) {
    res.status(200).json(
      {
        success: true,
        message: 'Successfully got subscriber',
        subscriber: res.subscriber
      }
    )
  }
      
  static async addSubscriber (req, res) {
    const errors = validationResult(req);
    // console.log('errors', errors)
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
      
    const { name, subscribedChannel } =req.body;
    const newSubscriber = await models.Subscriber.create(
      {
        name: name,
        subscribedChannel: subscribedChannel
      }
    );
    
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
  }
      
  static async updateSubscriber (req, res) {
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
      res.status(200).json(
        {
          success: true,
          message: 'Successfully updated subscriber',
          updatedSubscriber: updatedSubscriber
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
      
  static async deleteSubscriber (req, res) {
    try {
      await res.subscriber.destroy()
      res.json(
        { 
          success: true,
          message: 'Successfully deleted subscriber' 
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
      
  static async getSubscriber (req, res, next) {
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
    } catch (err) {
      return res.status(500).json(
        { 
          success: false,
          message: err.message 
        }
      )
    }  
    next()
  }
}
