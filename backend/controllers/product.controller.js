import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message});
    }
}

export const createProduct= async (req, res) => {
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
    
}

export const updateProduct= async (req, res) => {
        const { id } = req.params;
        const product = req.body;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({error: "Invalid id"});
            
        }
        try {
            const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
            res.status(200).json(updatedProduct);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: error.message});
        }
    }

export const deleteProduct=async (req, res) => {
    const id = req.params.id;
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({message: "Product deleted"});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message, message: "Product not found"});
    }
}