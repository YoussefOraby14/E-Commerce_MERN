import mongoose, { Document, Schema, Model, SchemaType, type ObjectId } from "mongoose";
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

// CartItem Schema
const cartItemSchema = new Schema<ICartItem>(
    {
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        unitPrice: { type: Number, required: true },
        quantity: { type: Number, required: true, default: 1 },
    }
);

// Cart Schema
const cartSchema = new Schema<ICart>(
    {
        userId: { type: Schema.Types.ObjectId, ref :"User", required: true },
        items: [cartItemSchema],
        totalAmount: { type: Number, required: true, default: 0 },
        status: { type: String, enum: ['active', 'completed'], default: 'active' },
    });

export const Cart: Model<ICart> = mongoose.model<ICart>('Cart', cartSchema);