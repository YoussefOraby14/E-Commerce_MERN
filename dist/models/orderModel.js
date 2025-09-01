import mongoose, { Document, Schema, Model } from "mongoose";
const orderItemSchema = new Schema({
    productTitle: { type: String, required: true },
    productImage: { type: String, required: true },
    unitPrice: { type: Number, required: true },
    quantity: { type: Number, required: true },
});
const orderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: { type: [orderItemSchema], required: true },
    totalAmount: { type: Number, required: true },
    address: { type: String, required: true },
});
export const Order = mongoose.model("Order", orderSchema);
//# sourceMappingURL=orderModel.js.map