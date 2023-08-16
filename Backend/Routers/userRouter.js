const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const userDetailsModel = require('../Models/userLoginModel')
const UserRegisterModel = require("../Models/userRegisterModel");

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

module.exports = router;