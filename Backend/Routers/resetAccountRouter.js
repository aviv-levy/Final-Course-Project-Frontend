const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const moment = require('moment');
const userUpdateModel = require('../Models/userLoginModel');
const resetPasswordModel = require('../Models/resetPasswordModel');


async function sendEmail(mailOptions) {
    return new Promise((resolve, reject) => {
        // Send email with a link to reset the password
        const transporter = nodemailer.createTransport({
            // Configure your email provider here
            service: 'gmail',
            auth: {
                user: 'finalproject1413@gmail.com',
                pass: 'kngd xzlq zcnt ifka',
            },
        });
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                reject(error);
            } else {
                console.log('Email sent:', info.response);
                resolve(info);
            }
        });
    });
}

// Send reset password email
async function sendResetPasswordEmail(token, reciver) {

    const mailOptions = {
        from: 'finalproject1413@gmail.com',
        to: 'avvvviv@gmail.com', //At the end change to receiver
        subject: 'FreeStyle - Password Reset',
        text: `Click on this link to reset your password: http://localhost:3000/reset-password/${token}`,
    };

    await sendEmail(mailOptions);
}

// Check if the token is expired.
async function checkExpiredToken(token) {
    const user = await resetPasswordModel.findOne({ token: token });
    if (user === null)
        return true

    if (!moment().isBefore(user.expires))
        return true;
    return false;
}

// http://localhost:4500/resetAccount/:email
router.get('/:email', async (req, res) => {
    try {
        const email = req.params.email;
        if (!await userUpdateModel.findOne({ email: email }))
            return res.status(401).send('Email not found');

        await resetPasswordModel.deleteMany({ email: email })

        const token = jwt.sign({ email: email }, process.env.SECRET, { expiresIn: '1h' })
        const expires = moment().add(1, 'hour').format(); // Token expires in 1 hour

        // Store token and expiration in the database
        const user = new resetPasswordModel({ email: email, token: token, expires: expires });
        console.log(user);
        await user.save();

        //Send mail
        await sendResetPasswordEmail(token, email);

        res.status(200).send('Mail sent with link to reset')
    } catch (err) {
        res.status(500).send(err.message);
    }
})

// http://localhost:4500/resetAccount/checkExpired
router.post('/checkExpired', async (req, res) => {
    try {

        if(await checkExpiredToken(req.body.token))
            return res.status(404).send();
        res.status(200).send();
    } catch (err) {
        res.status(500).send(err.message);
    }
})

// http://localhost:4500/resetAccount
router.post('/', async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        if(await checkExpiredToken(token))
            return res.status(404).send();

        const valRes = resetPasswordModel.validatePost(req.body); // synchronized method for running validations
        if (valRes.error)
            return res.status(400).send(valRes.error);

        // Update the user's password 
        await userUpdateModel.updateOne({ _id: user._id }, { password: await bcrypt.hash(newPassword, 10) })

        // Remove the used token from the database
        await resetPasswordModel.deleteMany({ email: email })

        return res.status(200).send('Password reset successful');
    } catch (err) {
        res.status(500).send(err.message);
    }
})


module.exports = router;