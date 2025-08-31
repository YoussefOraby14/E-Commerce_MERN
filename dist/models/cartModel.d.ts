import mongoose, { Document, Model, type ObjectId } from "mongoose";
import type { IProduct } from "./productModel.js";
export interface ICartItem extends Document {
    product: IProduct | mongoose.Types.ObjectId;
    unitPrice: number;
    quantity: number;
}
export interface ICart extends Document {
    userId: ObjectId | string;
    items: ICartItem[];
    totalAmount: number;
    status: 'active' | 'completed';
}
export declare const Cart: Model<ICart>;
//# sourceMappingURL=cartModel.d.ts.map