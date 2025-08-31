import express from 'express';
import { getAllProducts } from '../services/productService.js';
const router = express.Router();
// GET /products - Get all products
router.get('/', async (req, res) => {
    // Placeholder: Replace with actual DB logic
    const products = getAllProducts();
    res.status(200).send(products);
});
export default router;
//# sourceMappingURL=productRoute.js.map