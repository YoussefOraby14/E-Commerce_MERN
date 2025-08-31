import { Cart } from '../models/cartModel.js';
export async function createCartForUser({ userId }) {
    // Check if user exists
    // const user = await User.findById(userId);
    // if (!user) {
    //     throw new Error('User not found');
    // }
    // Create a new cart
    const cart = await Cart.create({ userId });
    await cart.save();
    return cart;
}
export async function getActiveCart({ userId }) {
    let cart = await Cart.findOne({ userId, status: 'active' });
    if (!cart) {
        cart = await createCartForUser({ userId });
    }
    return cart;
}
//# sourceMappingURL=cartService.js.map