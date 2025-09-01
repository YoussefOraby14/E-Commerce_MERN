import mongoose, { Document, Schema, Model, SchemaType } from "mongoose";
// CartItem Schema
const cartItemSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    unitPrice: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 1 },
});
// Cart Schema
const cartSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [cartItemSchema],
    totalAmount: { type: Number, required: true, default: 0 },
    status: { type: String, enum: ['active', 'completed'], default: 'active' },
});
export const Cart = mongoose.model('Cart', cartSchema);
//# sourceMappingURL=cartModel.js.map