const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createCustomer = {
    body: Joi.object().keys({
      firstName: Joi.string().required(),  
      lastName: Joi.string().required(),  
      email: Joi.string().required().email(),
      phoneNumber: Joi.number().min(6000000000).max(9999999999).required(),
      age: Joi.number().min(10).max(99).required(),
      location: Joi.string().required(),
      pin: Joi.number().min(600000).max(700000).required(),
      dob: Joi.date().required(),
      gender: Joi.string().required(),
      domain: Joi.string().required(),
    }),
  };
  
 
  
  const getCustomer = {
    params: Joi.object().keys({
      CustomerId: Joi.string().custom(objectId),
    }),
  };
  
  const updateCustomer = {
    params: Joi.object().keys({
      CustomerId: Joi.required().custom(objectId),
    }),
    body: Joi.object().keys({
        firstName: Joi.string(),  
        lastName: Joi.string(),  
        email: Joi.string().email(),
        phoneNumber: Joi.number().min(7000000000).max(9999999999),
        age: Joi.number().min(10).max(100),
        location: Joi.string(),
        pin: Joi.number().min(600000).max(699999),
        dob: Joi.date(),
        gender: Joi.string(),
        domain: Joi.string(),
      }).min(1),
  };
  
  const deleteCustomer = {
    params: Joi.object().keys({
      CustomerId: Joi.string().custom(objectId),
    }),
  };
  
  module.exports = {
    createCustomer,
    getCustomer,
    updateCustomer,
    deleteCustomer,
  };