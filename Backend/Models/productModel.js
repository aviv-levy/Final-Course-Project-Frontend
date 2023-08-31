const JOI = require("joi");
const mongoose = require("mongoose");
const productModelScheme = require('../Schemas/productSchema.js');



// JOI Validations
const baselineValidation = {
    sizeQuantity: JOI.array().items( 
        JOI.object().keys({
        size: JOI.string().alphanum().required(),
        quantity: JOI.number().positive().greater(0).required()
    })),
    title: JOI.string().required().min(2).max(20),
    subtitle: JOI.string().required().min(2).max(20),
    description: JOI.string(),
    brand: JOI.string(),
    category: JOI.string().required(),
    gender: JOI.string().required(),
    price: JOI.number().required().min(1),
    img: JOI.string().base64(),
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
