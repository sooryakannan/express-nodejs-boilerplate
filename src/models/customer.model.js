const mongoose = require('mongoose');
const { toJSON } = require('./plugins');
const validator = require('validator');

const customerSchema = mongoose.Schema({
    firstName:{
        type: String,
        required:true,
    },
    lastName:{
        type: String,
        required:true,
    },
    email:{
        type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
      

    },
    phoneNumber:{
        type: Number,
        min:7000000000,
        max:9999999999,
        required:true,
    },
    age:{
        type: Number,
        required:true,
        min:10,
        max:100,
    },
    location:{
        type: String,
        required:true,  
    },
    pin:{
        type: Number,
        required:true,
        min:600000,
        max:700000,
    },
    dob:{
        type: Date,
        require: true,

    },
    gender:{
        type: String,
        require: true
    },
    domain:{
        type: String,
        require: true
    }
});

customerSchema.plugin(toJSON);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
 customerSchema.statics.isEmailTaken = async function (email, excludeUserId) {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!user;
  };

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;