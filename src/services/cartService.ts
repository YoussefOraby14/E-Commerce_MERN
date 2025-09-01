import { Cart } from '../models/cartModel.js';
// import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import mongoose from "mongoose";
export interface ICreateCartInput {
    userId: string;
    // status: string;
}

export async function createCartForUser({userId}: ICreateCartInput) {
    // Check if user exists
    // const user = await User.findById(userId);
    // if (!user) {
    //     throw new Error('User not found');
    // }

    // Create a new cart
    const cart = await Cart.create({  userId});

    return cart;
}

export interface IGetActiveCart {
    userId: string;
    // status: string;
}

export async function getActiveCart({ userId }: IGetActiveCart) {
    let cart = await Cart.findOne({ 
        userId: new mongoose.Types.ObjectId(userId), 
        status: 'active' 
    });

    if (!cart) {
        cart = await createCartForUser({ userId });
    }
    return cart;
}


export interface IAddItemInput {
    userId: string;
    productId: string;
    quantity?: number;
}

/**
 * Add item(s) to the user's active cart. If no active cart exists it will be created.
 * - If the product already exists in the cart, increases its quantity.
 * - Recalculates totalAmount and saves the cart.
 */
export async function addItemsToCart({ userId, productId, quantity = 1 }: IAddItemInput) {
    if (!userId) throw new Error('userId is required');
    if (!productId) throw new Error('productId is required');
    if (quantity <= 0) throw new Error('quantity must be greater than 0');

    // Ensure product exists
    const product = await Product.findById(new mongoose.Types.ObjectId(productId));
    if (!product) throw new Error('Product not found');

    // Get or create active cart
    const cart = await getActiveCart({ userId });
    if (!cart) throw new Error('Failed to get or create cart');

    const unitPrice = product.price;

    // Find existing item
    const existingItem = cart.items.find(
      item => item.product.toString() === productId.toString()
    );

    // Determine new quantity and validate against stock
    const existingQty = existingItem ? (existingItem.quantity || 0) : 0;
    const newTotalQty = existingQty + quantity;

    if (newTotalQty > product.stock) {
        throw new Error(`Requested quantity (${newTotalQty}) exceeds available stock (${product.stock}).`);
    }

    if (existingItem) {
        existingItem.quantity = newTotalQty;
        existingItem.unitPrice = unitPrice;
    } else {
        cart.items.push({ product: product._id, unitPrice, quantity } as any);
    }

    // Recalculate totalAmount
    cart.totalAmount = cart.items.reduce(
        (sum, it) => sum + (it.unitPrice * it.quantity), 
        0
    );

    await cart.save();
    await cart.populate('items.product');

    return cart;
}




