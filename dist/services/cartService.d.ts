import mongoose from "mongoose";
export interface ICreateCartInput {
    userId: string;
}
export declare function createCartForUser({ userId }: ICreateCartInput): Promise<mongoose.Document<unknown, {}, import("../models/cartModel.js").ICart, {}, {}> & import("../models/cartModel.js").ICart & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export interface IgetActiveCart {
    userId: string;
}
export declare function getActiveCart({ userId }: IgetActiveCart): Promise<mongoose.Document<unknown, {}, import("../models/cartModel.js").ICart, {}, {}> & import("../models/cartModel.js").ICart & Required<{
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
//# sourceMappingURL=cartService.d.ts.map