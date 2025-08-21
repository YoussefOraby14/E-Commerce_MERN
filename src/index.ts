import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.js";

const app = express();
const port = 3001;

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/ecommerce")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ Error connecting to MongoDB:", err));

app.use('/user',userRoute);


app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
