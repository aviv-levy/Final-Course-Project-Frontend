const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const userDetailsModel = require('../Models/userLoginModel');
const userUpdateModel = require('../Models/userRegisterModel');
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
        if (req.body.img === '')
            delete req.body.img;
        const valRes = ProductModel.validatePost(req.body); // synchronized method for running validations
        if (valRes.error) {
            console.log(valRes.error);
            return res.status(400).send(valRes.error);
        }
        const product = new ProductModel(req.body);
        await product.save();

        res.status(201).send('Product added')
    } catch (err) {
        res.status(500).send(err.message);
    }
})

//http://localhost:4500/user/updateAccount
router.put('/updateAccount', async (req, res) => {
    try {
        const userId = req.body._id;
        delete req.body.__v;
        delete req.body._id;
        delete req.body.blockTime;

        if (req.body.password === undefined || req.body.password == '')
            req.body.password = 'Aa!12345';

        const valRes = userUpdateModel.validatePost(req.body);
        if (valRes.error) {
            console.log(valRes.error);
            return res.status(400).send(valRes.error);
        }

        if (req.body.password === 'Aa!12345') {
            const user = await userDetailsModel.findOne({ _id: req.id });
            req.body.password = user.password;
        }
        else
            req.body.password = await bcrypt.hash(req.body.password, 10)

        await userUpdateModel.updateOne({ _id: userId }, { $set: req.body })
        let user = await userDetailsModel.findOne({ _id: req.id });
        user.password = undefined;
        res.status(201).json(user);

    } catch (err) {
        res.status(500).send(err.message);
    }
})

//http://localhost:4500/user/updateProfileImg
router.put('/updateProfileImg', async (req, res) => {
    try {
        const valRes = userUpdateModel.validatePut(req.body);
        if (valRes.error)
            return res.status(400).send(valRes.error);

        await userUpdateModel.updateOne({ _id: req.id }, { $set: { img: req.body.img } })

        res.status(201).json('great');
    } catch (err) {
        res.status(500).send(err.message);
    }
})


// http://localhost:4500/user/likeProduct/:productId
router.put('/likeProduct/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;
        let user = await userDetailsModel.findOne({ _id: req.id });
        let flag = true;

        await Promise.all(user.favoriteProducts.map(async (product) => {
            if (product === productId) {
                flag = false;
                await userDetailsModel.updateOne({ _id: req.id }, { $pull: { favoriteProducts: productId } })
                return;
            }
        }));

        if (flag)
            await userDetailsModel.updateOne({ _id: req.id }, { $push: { favoriteProducts: productId } })

        user = await userDetailsModel.findOne({ _id: req.id });
        user.password = undefined;
        res.status(201).json(user);

    } catch (err) {
        res.status(500).send(err.message);
    }
})


// http://localhost:4500/user/addtocart/:productId
router.put('/addtocart/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;
        let user = await userDetailsModel.findOne({ _id: req.id });
        let flag = true;

        await Promise.all(user.cartProducts.map(async (product) => {
            if (product === productId) {
                flag = false;
                await userDetailsModel.updateOne({ _id: req.id }, { $pull: { cartProducts: productId } })
                return;
            }
        }));

        if (flag)
            await userDetailsModel.updateOne({ _id: req.id }, { $push: { cartProducts: productId } })

        user = await userDetailsModel.findOne({ _id: req.id });
        user.password = undefined;
        res.status(201).json(user);

    } catch (err) {
        res.status(500).send(err.message);
    }
})

module.exports = router;