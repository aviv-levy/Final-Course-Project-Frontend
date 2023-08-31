const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const userDetailsModel = require('../Models/userLoginModel')
const ProductModel = require("../Models/productModel");

//http://localhost:4500/user/userDetails
router.get('/userDetails', async (req, res) => {
    try {
        const user = await userDetailsModel.findOne({ _id: req.id });
        user.password = undefined;
        res.status(200).json(user);
    } catch (err) {
        res.status(500).send(err.message);
    }
})

//http://localhost:4500/user/addProduct
router.post('/addProduct', async (req, res) => {
    try {
        req.body.userId = req.id;
        const valRes = ProductModel.validatePost(req.body); // synchronized method for running validations
        if (valRes.error) {
            console.log(valRes.error);
            return res.status(400).send(valRes.error);
        }
        
        console.log(req.body);
        const product = new ProductModel(req.body);
        await product.save();

        res.status(201).send('Product added')
    } catch (err) {
        res.status(500).send(err.message);
    }
})


module.exports = router;