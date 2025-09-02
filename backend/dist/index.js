import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.js";
import { seedProducts } from "./services/productService.js";
import productRoute from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";
// Load environment variables from .env file
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = 3001;
app.use(express.json());
mongoose.connect(process.env.DATABASE_URL || "")
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch(err => console.error("❌ Error connecting to MongoDB:", err));
seedProducts();
app.use('/user', userRoute);
app.use("/product", productRoute);
app.use('/cart', cartRoute);
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map