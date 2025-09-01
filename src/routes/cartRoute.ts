import { Router } from "express";
import { Cart } from "../models/cartModel.js";  
import mongoose from "mongoose";
import { addItemsToCart, getActiveCart } from "../services/cartService.js";
import validateJWT from "../middlewares/validateJWT.js";

// Extend Express Request interface to include 'user'
declare module "express-serve-static-core" {
  interface Request {
    user?: any;
  }
}

const router = Router();

router.get("/", validateJWT, async (req, res) => {
  try {
    if (!req.user) return res.status(401).send("Unauthorized");
    const userId = req.user._id;
    const cart = await getActiveCart({ userId });
    res.status(200).json(cart);
  } catch (err) {
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
    
  } catch (error) {
    const errorMessage = (error as Error).message;
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

export default router;
