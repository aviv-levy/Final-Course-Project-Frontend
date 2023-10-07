const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({
    products: Array,
    address: Object,
    paypalPayment: Object,
    orderNumber: Number,
    status: String
})


module.exports = orderSchema;