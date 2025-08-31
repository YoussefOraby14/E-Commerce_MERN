import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.js";
import { seedProducts } from "./services/productService.js";
import productRoute from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";

const app = express();
const port = 3001;

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/ecommerce")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ Error connecting to MongoDB:", err));

seedProducts()

app.use('/user',userRoute);

app.use("/product",productRoute);

app.use('/cart', cartRoute);

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
