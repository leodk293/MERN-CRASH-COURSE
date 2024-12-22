const express = require('express');
const router = express.Router();

const {
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct
} = require('../controllers/product.controller.js');

router.get('/', getAllProducts); // Pass function reference
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
