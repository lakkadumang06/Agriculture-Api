const cartmodel = require("../model/cart.model");
const productmodel = require("../model/product.model");
const Storage = require('node-persist');
Storage.init();
exports.addtocart = async (req, res) => {
    const productid = req.params.id;
    const qty = req.body.quantity;
    try {
        const product = await productmodel.findById(productid);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        const userid = await Storage.getItem('user_id');
        if (!userid) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        let cartItem = await cartmodel.findOne({ userid: userid, name: product.name });
        console.log(cartItem)

        if (cartItem) {
            cartItem.quantity += qty;
            await cartItem.save();
            return res.status(200).json({
                success: true,
                data: cartItem,
                message: 'Quantity updated in the cart'
            });
        } else {
            const product_data = {
                userid: userid,
                productid: productid,
                name: product.name,
                price: product.price,
                quantity: qty,
            }
            cartItem = await cartmodel.create(product_data);
            return res.status(200).json({
                success: true,
                data: cartItem,
                message: 'Product added to cart successfully'
            });
        }
    } catch (error) {
        console.error('Error adding product to cart:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}



exports.getcart = async (req, res) => {
    try {
        let userid = await Storage.getItem('user_id');

        if (!userid) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const cartItems = await cartmodel.find({ userid: userid });
        res.status(200).json({
            data: cartItems,
            message: "Cart fetched successfully"
        });
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
