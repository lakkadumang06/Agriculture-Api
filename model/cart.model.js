const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
    userid:{
        type: String
    },
    name: {
        type: String
    },
    price: {
        type: String 
    },
    quantity: {
        type: Number
    }
});

module.exports = mongoose.model('cart', cartSchema);
