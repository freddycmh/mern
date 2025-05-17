import express from "express";
import dotenv from "dotenv";
import { connectDB } from './config/db.js'
import Product from "./models/product.model.js";

dotenv.config();

const app = express();

app.use(express.json());//allows to accept json in the req.body

app.post("/api/products", async (req, res) => {
    const product = req.body;// user will send this data
    
    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({error: "Please fill all the fields"});        
    }
    
    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message});
    }
    
})

app.delete("/api/products/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({message: "Product deleted"});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message});
    }
})

//postman

app.listen(3000,()=>{
    connectDB();
    console.log("Serve started at http://localhost:3000");
});




