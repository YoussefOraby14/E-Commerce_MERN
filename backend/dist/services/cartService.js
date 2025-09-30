import { Cart } from '../models/cartModel.js';
import { Order } from '../models/orderModel.js';
// import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import mongoose from "mongoose";
export async function createCartForUser({ userId }) {
    // Check if user exists
    // const user = await User.findById(userId);
    // if (!user) {
    //     throw new Error('User not found');
    // }
    // Create a new cart
    const cart = await Cart.create({ userId });
    return cart;
}
export async function getActiveCart({ userId, populateProducts }) {
    let cart;
    if (populateProducts) {
        cart = await Cart.findOne({
            userId: new mongoose.Types.ObjectId(userId),
            status: 'active'
        }).populate('items.product');
    }
    else {
        cart = await Cart.findOne({
            userId: new mongoose.Types.ObjectId(userId),
            status: 'active'
        });
    }
    if (!cart) {
        cart = await createCartForUser({ userId });
    }
    return cart;
}
/**
 * Add item(s) to the user's active cart. If no active cart exists it will be created.
 * - If the product already exists in the cart, increases its quantity.
 * - Recalculates totalAmount and saves the cart.
 */
export async function addItemsToCart({ userId, productId, quantity = 1 }) {
    if (!userId)
        throw new Error('userId is required');
    if (!productId)
        throw new Error('productId is required');
    if (quantity <= 0)
        throw new Error('quantity must be greater than 0');
    // Ensure product exists
    const product = await Product.findById(new mongoose.Types.ObjectId(productId));
    if (!product)
        throw new Error('Product not found');
    // Get or create active cart
    const cart = await getActiveCart({ userId });
    if (!cart)
        throw new Error('Failed to get or create cart');
    const unitPrice = product.price;
    // Find existing item
    const existingItem = cart.items.find(item => item.product.toString() === productId.toString());
    // Determine new quantity and validate against stock
    const existingQty = existingItem ? (existingItem.quantity || 0) : 0;
    const newTotalQty = existingQty + quantity;
    if (newTotalQty > product.stock) {
        throw new Error(`Requested quantity (${newTotalQty}) exceeds available stock (${product.stock}).`);
    }
    if (existingItem) {
        existingItem.quantity = newTotalQty;
        existingItem.unitPrice = unitPrice;
    }
    else {
        cart.items.push({ product: product._id, unitPrice, quantity });
    }
    // Recalculate totalAmount
    cart.totalAmount = cart.items.reduce((sum, it) => sum + (it.unitPrice * it.quantity), 0);
    await cart.save();
    await cart.populate('items.product');
    // return cart;
    return { data: await getActiveCart({ userId, populateProducts: true }), status: 200 };
}
export async function updateCartItem({ userId, productId, quantity }) {
    if (!userId)
        throw new Error('userId is required');
    if (!productId)
        throw new Error('productId is required');
    if (quantity <= 0)
        throw new Error('quantity must be greater than 0');
    // Get user's active cart
    const cart = await getActiveCart({ userId });
    if (!cart)
        throw new Error('Cart not found');
    // Find the item in cart
    const existingItem = cart.items.find(item => item.product.toString() === productId.toString());
    if (!existingItem) {
        throw new Error('Item not found in cart');
    }
    // Check if product still exists and has enough stock
    const product = await Product.findById(new mongoose.Types.ObjectId(productId));
    if (!product)
        throw new Error('Product not found');
    if (product.stock && quantity > product.stock) {
        throw new Error(`Requested quantity (${quantity}) exceeds available stock (${product.stock}).`);
    }
    // Update the item
    existingItem.quantity = quantity;
    existingItem.unitPrice = product.price; // Update price in case it changed
    // Recalculate totalAmount
    cart.totalAmount = cart.items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
    await cart.save();
    await cart.populate('items.product');
    // return cart;
    return { data: await getActiveCart({ userId, populateProducts: true }), status: 200 };
}
export async function removeCartItem({ userId, productId }) {
    if (!userId)
        throw new Error("userId is required");
    if (!productId)
        throw new Error("productId is required");
    // Get user's active cart
    const cart = await getActiveCart({ userId });
    if (!cart)
        throw new Error("Cart not found");
    // Filter out the product to be removed
    const updatedItems = cart.items.filter(item => item.product.toString() !== productId.toString());
    if (updatedItems.length === cart.items.length) {
        throw new Error("Item not found in cart");
    }
    cart.items = updatedItems;
    // Recalculate totalAmount
    cart.totalAmount = cart.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    await cart.save();
    await cart.populate("items.product");
    // return cart;
    return { data: await getActiveCart({ userId, populateProducts: true }), status: 200 };
}
export async function clearCart({ userId }) {
    if (!userId)
        throw new Error("userId is required");
    // Get user's active cart
    const cart = await getActiveCart({ userId });
    if (!cart)
        throw new Error("Cart not found");
    // Clear items + reset total
    cart.items = [];
    cart.totalAmount = 0;
    await cart.save();
    await cart.populate("items.product");
    return { data: await getActiveCart({ userId, populateProducts: true }), status: 200 };
}
export async function checkout({ userId, address }) {
    if (!userId)
        throw new Error("userId is required");
    if (!address)
        throw new Error("address is required");
    const cart = await getActiveCart({ userId });
    if (!cart || cart.items.length === 0) {
        throw new Error("Cart is empty");
    }
    const orderItems = [];
    for (const item of cart.items) {
        const product = await Product.findById(item.product);
        if (!product) {
            throw new Error(`Product with ID ${item.product} not found`);
        }
        const orderItem = {
            productTitle: product.title,
            productImage: product.image,
            unitPrice: item.unitPrice,
            quantity: item.quantity
        };
        orderItems.push(orderItem);
    }
    const order = await Order.create({
        userId: new mongoose.Types.ObjectId(userId),
        items: orderItems,
        totalAmount: cart.totalAmount,
        address,
    });
    cart.status = 'completed';
    await cart.save();
    return order;
}
//# sourceMappingURL=cartService.js.map