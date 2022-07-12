const mongoose = require('mongoose');
const {Customer} = require('./models');
mongoose.connect(`mongodb://192.168.1.155:27017/node-boilerplate`);


const user = new Customer({
    firstName:"arthika",
    lastName:"annan",
    email:"arthika@gmail.com",
    phoneNumber:9047642850,
    age:25,
    location:"kariyenthalpatti",
    pin:630203,
    dob:'1999-03-09',
    gender:"male",
    domain:"Developer"

})

const result = Customer.create(user);
console.log(result);

