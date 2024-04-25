const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
    userid: {
        type: String
    },
    quantity: {
        type: Number
    },
    totalCost: {
        type: Number
    }
})

module.exports = mongoose.model("bill", billSchema)