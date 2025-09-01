import mongoose, { Document, Schema, Model } from "mongoose";

export interface IOrderItem {
  productTitle: string;
  productImage: string;
  unitPrice: number;
  quantity: number;
}

export interface IOrder extends Document {
  userId: mongoose.Types.ObjectId | string;
  items: IOrderItem[];
  totalAmount: number;
  address: string;
  
}

const orderItemSchema = new Schema<IOrderItem>(
  {
    productTitle: { type: String, required: true },
    productImage: { type: String, required: true },
    unitPrice: { type: Number, required: true },
    quantity: { type: Number, required: true },
  }
);

const orderSchema = new Schema<IOrder>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: { type: [orderItemSchema], required: true },
    totalAmount: { type: Number, required: true },
    address: { type: String, required: true },
  }
);

export const Order: Model<IOrder> = mongoose.model<IOrder>("Order", orderSchema);
