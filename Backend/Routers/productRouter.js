const express = require("express");
const router = express.Router();
const ProductModel = require("../Models/productModel");
const verifyToken = require("../verifyToken");


//http://localhost:4500/products/getProductByCategory/:gender/:category
router.get('/getProductByCategory/:gender/:category', async (req, res) => {
    try {
        const gender = req.params.gender;
        const getcategory = req.params.category;
        const category = getcategory.charAt(0).toUpperCase() + getcategory.slice(1);

        const Products = await ProductModel.find({
            $or: [
                { gender: gender, category: category  },
                { gender: 'Unisex', category: category }
            ]
        });
        if (Products === null)
            res.status(404).send('not found any')

        res.status(200).json(Products);
    } catch (err) {
        res.status(500).send(err.message);
    }
})


// http://localhost:4500/products/getMyProducts
router.get('/getMyProducts', verifyToken, async (req, res) => {
    try {
        const Products = await ProductModel.find({ userId: req.id });
        if (Products === null)
            res.status(404).send('not found any')

        res.status(200).json(Products);

    } catch (err) {
        res.status(500).send(err.message);
    }
})


module.exports = router;