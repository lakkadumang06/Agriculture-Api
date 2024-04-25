const mongoose = require('mongoose');

const billmodel = require("../model/bill.model");
const cartmodel = require("../model/cart.model");
const Storage = require('node-persist');
Storage.init();

exports.getbill = async (req, res) => {
    let userid = await Storage.getItem('user_id');
    try {
        if (!userid) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const billItems = await cartmodel.find({ userid: userid });
        
        if (billItems.length === 0) {
            return res.status(404).json({ success: false, message: 'No items found in the cart' });
        }

        let totalCost = 0;

        for (let i = 0; i < billItems.length; i++) {
            const price = billItems[i].price;
            const qty = billItems[i].quantity;
            const itemCost = price * qty; 
            totalCost += itemCost;
        }

        res.status(200).json({
            data: billItems,
            totalCost: totalCost,
            message: "Bill fetched successfully"
        });
    } catch (error) {
        console.error('Error fetching bill:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}