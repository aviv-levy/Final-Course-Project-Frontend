const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    phone: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: String,
    img: String,
    img_alt: String,
    address: {
        type: Object,
        city: String,
        street: String,
        housenum: Number,
    },
    biz: Boolean,
    likedProducts: Array,
    isAdmin: Boolean,
    status: {
        type: String,
        default: 'Active'
    },
    loginTries: {
        type: Number,
        default: 0
    },
    blockTime: Number
})


module.exports = UserSchema;