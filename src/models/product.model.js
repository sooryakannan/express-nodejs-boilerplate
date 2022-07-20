const mongoose = require('mongoose');
const { toJSON } = require('./plugins');


const ProductSchema = mongoose.Schema({
    productName:{
        type: String,
        required:true,
    },
    price:{
        type: Number,
        required:true,
    },
    dom:{
        type: Date,
        require: true,

    },
    doe:{
        type: Date,
        require: true,
    },
});

ProductSchema.plugin(toJSON);


const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;