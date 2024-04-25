const productmodel = require("../model/product.model");
const cloudinary = require('cloudinary').v2

exports.addproduct = async (req, res) => {
    const file =await req.files.photo;
    const { name, price , description, stock } = req.body;
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath)
        const newproduct = new productmodel({
            name: name,
            photo: result.url,
            price: price,
            description: description,
            stock: stock
        });
        await newproduct.save();
        res.status(201).json({
            data: newproduct,
            message: "Product created successfully"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};  

exports.getproduct = async (req, res) => {  
    try {
        const product = await productmodel.find();
        res.status(200).json({
            data: product,
            message: "Product fetched successfully"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateproduct = async (req, res) => {
    const file =await req.files.photo;
    const { name, price , description, stock } = req.body;
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath)
        const updateproduct = await productmodel.findByIdAndUpdate(req.params.id, {
            name: name,
            photo: result.url,
            price: price,
            description: description,
            stock: stock
        }, { new: true });
        res.status(200).json({
            data: updateproduct,
            message: "Product updated successfully"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteproduct = async (req, res) => {
    try {
        const deleteproduct = await productmodel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            data: deleteproduct,
            message: "Product deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getsingleproduct = async (req, res) => {
    try {
        const product = await productmodel.findById(req.params.id);
        res.status(200).json({
            data: product,
            message: "Product fetched successfully"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
