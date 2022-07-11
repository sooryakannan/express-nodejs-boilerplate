const mongoose = require('mongoose');
const { toJSON } = require('./plugins');
const validator = require('validator');

const customerSchema = mongoose.Schema({
    firstName:{
        type: String,
        required:true,
    },
    lastName:{
        typr: String,
        required:true
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
        validate: {
            validator: function(v) {
                return /d{10}/.test(v);
            },
            message: '{VALUE} is not a valid 10 digit number!'
        },
        required:true,
    },
    age:{
        type: Number,
        validate:{
        validator: function(v){
            return /d{2}/.test(v);
        },
        message: '{VALUE} is not a valid age!'
        },
        required:true,
    },
    location:{
        type: String,
        required:true,  
    },
    pin:{
        type: Number,
        required:true,
        validate:{
            validator: function(v){
                return /d{6}/.test(v);
            },
            message: '{VALUE} is not a valid pin number!'
            },
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

const customer = mongoose.model('customer', customerSchema);

module.exports = customer;