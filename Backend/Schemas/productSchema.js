const mongoose = require("mongoose");


const ProductSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    description: String,
    brand: String,
    category: String,
    gender: String,
    price: Number,
    stock: Object,
    img: String,
    img_alt: String,
    userId: String
})


module.exports = ProductSchema;