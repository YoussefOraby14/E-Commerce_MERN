import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IProduct extends Document {
    title: string;
    image: string;
    price: number;
    stock: number;
    
}

const productSchema: Schema<IProduct> = new Schema(
    {
        title: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        stock: { type: Number, required: true, default: 0 },
    }
);

const Product: Model<IProduct> = mongoose.model<IProduct>('Product', productSchema);

export default Product;