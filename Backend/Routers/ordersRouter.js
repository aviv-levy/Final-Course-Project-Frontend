const express = require("express");
const router = express.Router();
const CountModel = require('../Schemas/counterSchema.js')
const OrderModel = require('../Models/ordersModel.js')

// http://localhost:4500/orders/createOrder
router.post('/createOrder', async (req, res) => {
    try {
        const { paypalPayment, address, products } = req.body;
        if (paypalPayment.status !== 'COMPLETED')
            return res.status(503).send('Service unavailable'); //Didn't recieve payment from paypal

        const valRes = OrderModel.validatePost(req.body); // JOI validation
        if (valRes.error)
            return res.status(400).send(valRes.error);

        const orderCount = await CountModel.findOneAndUpdate({ title: 'orderCounter' }, { $inc: { orderCounter: 1 } }, { new: true })
        if (orderCount === null) {
            const count = new CountModel({ orderCounter: 10003 })
            await count.save();
        }

        const order = new OrderModel({
            products: products,
            address: address,
            paypalPayment: paypalPayment,
            orderNumber: orderCount.orderCounter,
            status: 'Pending'
        });
        await order.save();

        res.status(201).send('Order has been created')

    } catch (err) {
        res.status(500).send(err.message);
    }
})



module.exports = router;