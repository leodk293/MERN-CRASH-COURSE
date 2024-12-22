const Product = require('../models/product.module.js');

async function getAllProducts(req, res) {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    }
    catch (error) {
        console.error('Error fetching products:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

async function createProduct(req, res) {
    const product = req.body; //user will send the product details in the request body
    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    const newProduct = new Product(product);

    try {
        await newProduct.save();//save the product to the database
        res.status(201).json({ success: true, product: newProduct });
    }
    catch (error) {
        console.error('Error saving product:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

async function updateProduct(req, res) {
    const { id } = req.params;
    const product = req.body;
    /*if(!moongose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success: false, message: 'Invalid product id' });
    }*/
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json({ success: true, message: "product updated", data: updatedProduct });
    }
    catch (error) {
        console.error('Error updating product:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

async function deleteProduct(req, res) {
    const { id } = req.params
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Product removed' });
    }
    catch (error) {
        console.error('Error deleting product:', error.message);
        res.status(404).json({ success: false, message: 'Product not found' });
    }
    console.log(id)
}

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct
};
