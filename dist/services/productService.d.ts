export declare function getAllProducts(): Promise<(import("mongoose").Document<unknown, {}, import("../models/productModel.js").IProduct, {}, {}> & import("../models/productModel.js").IProduct & Required<{
    _id: unknown;
}> & {
    __v: number;
})[]>;
export declare function seedProducts(): Promise<import("mongoose").MergeType<import("mongoose").Document<unknown, {}, import("../models/productModel.js").IProduct, {}, {}> & import("../models/productModel.js").IProduct & Required<{
    _id: unknown;
}> & {
    __v: number;
}, Omit<{
    title: string;
    image: string;
    price: number;
    stock: number;
}, "_id">>[]>;
//# sourceMappingURL=productService.d.ts.map