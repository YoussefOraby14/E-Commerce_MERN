import { Router } from "express";
import { Cart } from "../models/cartModel.js";
import mongoose from "mongoose";
import { addItemsToCart, clearCart, getActiveCart, removeCartItem } from "../services/cartService.js";
import { updateCartItem } from "../services/cartService.js";
import validateJWT from "../middlewares/validateJWT.js";
import { Order } from "../models/orderModel.js";
import { checkout } from "../services/cartService.js";
const router = Router();
router.get("/", validateJWT, async (req, res) => {
    try {
        if (!req.user)
            return res.status(401).send("Unauthorized");
        const userId = req.user._id;
        const cart = await getActiveCart({ userId, populateProducts: true });
        res.status(200).json(cart);
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
});
// Create a new cart for the authenticated user (or for a provided userId)
// router.post("/items", validateJWT, async (req, res) => {
//   try {
//     if (!req.user) return res.status(401).send("Unauthorized");
//     const userId = req.user._id;
//     const { productId, quantity } = req.body;
//     if (!productId) return res.status(400).json({ message: "Product ID is required" });
//     const cart = await addItemsToCart({ userId, productId:productId, quantity:quantity});
//     res.status(201).json({ message: "Cart created", cart });
//   } catch (err) {
//     res.status(500).json({ message: "Failed to create cart", error: (err as Error).message });
//   }
// });
router.post("/items", validateJWT, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const userId = req.user._id;
        const { productId, quantity } = req.body;
        if (!productId) {
            return res.status(400).json({ message: "Product ID is required" });
        }
        const cart = await addItemsToCart({ userId, productId, quantity });
        res.status(201).json({
            success: true,
            message: "Item added to cart successfully",
            cart
        });
    }
    catch (error) {
        const errorMessage = error.message;
        console.error('Add to cart error:', errorMessage);
        // Handle specific errors with appropriate status codes
        if (errorMessage === 'Product not found') {
            return res.status(404).json({ message: errorMessage });
        }
        if (errorMessage.includes('stock')) {
            return res.status(400).json({ message: errorMessage });
        }
        if (errorMessage.includes('required') || errorMessage.includes('greater than 0')) {
            return res.status(400).json({ message: errorMessage });
        }
        // Generic server error
        res.status(500).json({
            message: "Internal server error",
            error: errorMessage
        });
    }
});
// Update item quantity in cart
router.put("/items", validateJWT, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }
        const userId = req.user._id;
        // const { , } = req.params;
        const { productId, quantity } = req.body;
        // Validation
        if (!quantity || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "Valid quantity is required"
            });
        }
        const cart = await updateCartItem({
            userId,
            productId,
            quantity: parseInt(quantity)
        });
        res.status(200).json({
            success: true,
            message: "Cart item updated successfully",
            cart
        });
    }
    catch (error) {
        console.error('Update cart item error:', error);
        const errorMessage = error.message;
        // Handle specific errors
        if (errorMessage === 'Item not found in cart') {
            return res.status(404).json({
                success: false,
                message: errorMessage
            });
        }
        if (errorMessage === 'Product not found') {
            return res.status(404).json({
                success: false,
                message: errorMessage
            });
        }
        if (errorMessage.includes('exceeds available stock')) {
            return res.status(400).json({
                success: false,
                message: errorMessage
            });
        }
        if (errorMessage.includes('required') || errorMessage.includes('greater than 0')) {
            return res.status(400).json({
                success: false,
                message: errorMessage
            });
        }
        // Generic server error
        res.status(500).json({
            success: false,
            message: "Failed to update cart item",
            error: errorMessage
        });
    }
});
// Delete item from cart
router.delete("/items/:productId", validateJWT, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        const userId = req.user._id;
        const { productId } = req.params;
        if (!productId) {
            return res.status(400).json({ success: false, message: "Product ID is required" });
        }
        const cart = await removeCartItem({ userId, productId });
        res.status(200).json({
            success: true,
            message: "Item removed from cart successfully",
            cart,
        });
    }
    catch (error) {
        const errorMessage = error.message;
        if (errorMessage === "Item not found in cart") {
            return res.status(404).json({ success: false, message: errorMessage });
        }
        if (errorMessage === "Cart not found") {
            return res.status(404).json({ success: false, message: errorMessage });
        }
        res.status(500).json({
            success: false,
            message: "Failed to remove item from cart",
            error: errorMessage,
        });
    }
});
// Clear all items in the cart
router.delete("/clear", validateJWT, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        const userId = req.user._id;
        const cart = await clearCart({ userId });
        res.status(200).json({
            success: true,
            message: "Cart cleared successfully",
            cart,
        });
    }
    catch (error) {
        const errorMessage = error.message;
        if (errorMessage === "Cart not found") {
            return res.status(404).json({ success: false, message: errorMessage });
        }
        res.status(500).json({
            success: false,
            message: "Failed to clear cart",
            error: errorMessage,
        });
    }
});
router.post("/checkout", validateJWT, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        const userId = req.user._id;
        const { address } = req.body;
        const order = await checkout({ userId, address });
        res.status(201).json({
            success: true,
            message: "Order created successfully",
            order,
        });
    }
    catch (error) {
        const errorMessage = error.message;
        if (errorMessage === "Cart is empty") {
            return res.status(400).json({ success: false, message: errorMessage });
        }
        res.status(500).json({
            success: false,
            message: "Failed to create order",
            error: errorMessage,
        });
    }
});
export default router;
//# sourceMappingURL=cartRoute.js.map