import express from "express";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

const app = express();

app.use(express.json()); // Middleware to parse the request.body : allows us to accept json data in req.body

app.use("/api/products", productRoutes);

app.listen(5000, () => {
  connectDB();
  console.log("Server starts at http://localhost:5000");
});
