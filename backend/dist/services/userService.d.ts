export declare function register(firstname: string, lastname: string, email: string, password: string): Promise<string>;
export declare function login(email: string, password: string): Promise<string>;
export declare function generateToken(data: any): string;
export declare function getMyOrders(userId: string): Promise<{
    data: (import("mongoose").Document<unknown, {}, import("../models/orderModel.js").IOrder, {}, {}> & import("../models/orderModel.js").IOrder & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[];
    status: number;
}>;
//# sourceMappingURL=userService.d.ts.map