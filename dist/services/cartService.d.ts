import mongoose from "mongoose";
export interface ICreateCartInput {
    userId: string;
}
export declare function createCartForUser({ userId }: ICreateCartInput): Promise<mongoose.Document<unknown, {}, import("../models/cartModel.js").ICart, {}, {}> & import("../models/cartModel.js").ICart & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export interface IGetActiveCart {
    userId: string;
}
export declare function getActiveCart({ userId }: IGetActiveCart): Promise<mongoose.Document<unknown, {}, import("../models/cartModel.js").ICart, {}, {}> & import("../models/cartModel.js").ICart & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
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
export declare function addItemsToCart({ userId, productId, quantity }: IAddItemInput): Promise<mongoose.Document<unknown, {}, import("../models/cartModel.js").ICart, {}, {}> & import("../models/cartModel.js").ICart & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export interface IUpdateCartItemInput {
    userId: string;
    productId: string;
    quantity: number;
}
export declare function updateCartItem({ userId, productId, quantity }: IUpdateCartItemInput): Promise<mongoose.Document<unknown, {}, import("../models/cartModel.js").ICart, {}, {}> & import("../models/cartModel.js").ICart & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export interface IRemoveCartItemInput {
    userId: string;
    productId: string;
}
export declare function removeCartItem({ userId, productId }: IRemoveCartItemInput): Promise<mongoose.Document<unknown, {}, import("../models/cartModel.js").ICart, {}, {}> & import("../models/cartModel.js").ICart & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export interface IClearCartInput {
    userId: string;
}
export declare function clearCart({ userId }: IClearCartInput): Promise<mongoose.Document<unknown, {}, import("../models/cartModel.js").ICart, {}, {}> & import("../models/cartModel.js").ICart & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
//# sourceMappingURL=cartService.d.ts.map