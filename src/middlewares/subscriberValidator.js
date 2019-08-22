import { check } from 'express-validator'

exports.validate = () => {
     return [ 
        check('name', 'A name should be a string').exists().isString(),
        check('subscribedChannel', 'A channel should be a string').isString(),
      ]  
}
