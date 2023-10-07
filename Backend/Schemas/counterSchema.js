const mongoose = require("mongoose");

const Counterchema = new mongoose.Schema({
    title:{
        type: String,
        default: 'orderCounter'
    },
    orderCounter: Number
})


const CounterModel = mongoose.model("CounterModel", Counterchema, "counters");

module.exports = CounterModel;