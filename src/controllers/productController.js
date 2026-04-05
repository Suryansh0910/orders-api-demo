const Product = require('../models/productModel');

const getAllProducts = (req, res) => {
    try {
        const products = Product.getAll();
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const getProductById = (req, res) => {
    try {
        const product = Product.getById(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const createProduct = (req, res) => {
    try {
        const { name, price } = req.body;
        
        if (!name || price === undefined) {
            return res.status(400).json({ success: false, message: 'Name and price are required' });
        }

        const newProduct = Product.create({ name, price });
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const updateProduct = (req, res) => {
    try {
        const updatedProduct = Product.update(req.params.id, req.body);
        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const deleteProduct = (req, res) => {
    try {
        const isDeleted = Product.delete(req.params.id);
        if (!isDeleted) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
