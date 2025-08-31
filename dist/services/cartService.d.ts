export interface ICreateCartInput {
    userId: string;
}
export declare function createCartForUser({ userId }: ICreateCartInput): Promise<import("mongoose").Document<unknown, {}, import("../models/cartModel.js").ICart, {}, {}> & import("../models/cartModel.js").ICart & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export interface IgetActiveCart {
    userId: string;
}
export declare function getActiveCart({ userId }: IgetActiveCart): Promise<import("mongoose").Document<unknown, {}, import("../models/cartModel.js").ICart, {}, {}> & import("../models/cartModel.js").ICart & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
//# sourceMappingURL=cartService.d.ts.map