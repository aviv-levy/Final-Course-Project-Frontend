const JOI = require("joi");
const mongoose = require("mongoose");
const productModelScheme = require('../Schemas/userSchema.js');



// JOI Validations
const baselineValidation = {
    title: JOI.string().required().min(2).max(20).alphanum(),
    subtitle: JOI.string().required().min(2).max(20).alphanum(),
    description: JOI.string().alphanum(),
    brand: JOI.string().required().min(2).max(20).alphanum(),
    category: JOI.string().required().alphanum(),
    gender: JOI.string().required().alphanum(),
    price: JOI.number().required().min(1),
    imageUrl: JOI.string().uri(),
    imageAlt: JOI.string(),
    userId: JOI.string().required(),
};



// Post Validation
productModelScheme.statics.validatePost = (obj) => {
    return JOI.object({
        ...baselineValidation,
        id: JOI.string().forbidden()
    }).validate(obj, { abortEarly: false });
}

const ProductModel = mongoose.model("ProductModel", productModelScheme, "products");

module.exports = ProductModel;
