import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log(`Error in Fetching Products: ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error!" });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the fields !" });
  }

  const newPoduct = new Product(product);

  try {
    await newPoduct.save();
    res.status(201).json({ success: true, data: newPoduct });
  } catch (error) {
    console.log(`Error in Create Product: ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error!" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product ID !" });
  }

  try {
    const upadtedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    }); //return the upadted object
    res.status(200).json({ success: true, data: upadtedProduct });
  } catch (error) {
    console.log(`Error in Updating Product: ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error!" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product ID !" });
  }

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product Deleted !" });
  } catch (error) {
    console.log(`Error in Deleting Product: ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error !" });
  }
};
