import { Document, Model } from 'mongoose';
export interface IProduct extends Document {
    title: string;
    image: string;
    price: number;
    stock: number;
}
declare const Product: Model<IProduct>;
export default Product;
//# sourceMappingURL=productModel.d.ts.map