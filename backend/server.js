import express from "express";
import dotenv from "dotenv";
import { connectDB } from './config/db.js'
import Product from "./models/product.model.js";
import mongoose from "mongoose";

import productRoutes from "./routes/product.route.js"

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());//allows to accept json in the req.body

app.use("/api/products", productRoutes);

//postman

app.listen(3000,()=>{
    connectDB();
    console.log("Serve started at http://localhost:"+PORT);
});




