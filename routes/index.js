var express = require('express');
var router = express.Router();

const admin = require('../controller/admin.controller');
const user = require('../controller/user.controller');
const product = require('../controller/product.controller');
const cart = require('../controller/cart.controller');
const bill = require('../controller/bill.controller');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name : 'dhxna8ozn',
    api_key : '383185166898481',
    api_secret : 'M0nj14KhiRQABN1rCtkvIKi4nIY'
})

router.post("/admin", admin.login);
router.get("/adminregister", admin.register);

router.post("/addproduct", product.addproduct);
router.get("/delete/:id", product.deleteproduct);
router.post("/update/:id", product.updateproduct);
router.get("/product", product.getproduct);
router.get("/product/:id", product.getsingleproduct);

router.post("/login", user.login);
router.post("/register", user.register);
router.get("/user", user.getuser);

router.get("/cart/:id", cart.addtocart);
router.get("/cart", cart.getcart);

router.get("/bill", bill.getbill);


module.exports = router;
