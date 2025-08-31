import { Router } from "express";
import { Cart } from "../models/cartModel.js";
import mongoose from "mongoose";
import { getActiveCart } from "../services/cartService.js";
import validateJWT from "../middlewares/validateJWT.js";
const router = Router();
router.get("/", validateJWT, async (req, res) => {
    try {
        if (!req.user)
            return res.status(401).send("Unauthorized");
        const userId = req.user._id;
        const cart = await getActiveCart({ userId });
        res.status(200).json(cart);
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
});
export default router;
//# sourceMappingURL=cartRoute.js.map