import type { Request, Response, NextFunction } from 'express';
interface ExtendedRequest extends Request {
    user?: any;
}
export declare function validateJWT(req: ExtendedRequest, res: Response, next: NextFunction): void;
export default validateJWT;
//# sourceMappingURL=validateJWT.d.ts.map