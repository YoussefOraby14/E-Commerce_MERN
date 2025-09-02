import mongoose, { Document, Model } from "mongoose";
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
export declare const Order: Model<IOrder>;
//# sourceMappingURL=orderModel.d.ts.map