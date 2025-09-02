import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
export function validateJWT(req, res, next) {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        res.status(401).send('Authorization header missing');
        return;
    }
    // Split the header to get the token
    const parts = authHeader.split(' ')[1];
    if (!parts) {
        res.status(403).send('Invalid Authorization header format');
        return;
    }
    jwt.verify(parts, process.env.JWT_SECRET || "", async (err, payload) => {
        if (err) {
            res.status(403).send('Invalid or expired token');
            return;
        }
        if (!payload) {
            res.status(403).send('Invalid token payload');
            return;
        }
        const user = await userModel.findOne({ email: payload.email });
        req.user = user;
        next();
    });
}
export default validateJWT;
//# sourceMappingURL=validateJWT.js.map