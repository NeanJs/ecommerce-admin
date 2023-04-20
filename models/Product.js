import mongoose, { Schema, model, models } from "mongoose";

const productSchema = new Schema({
  name: String,
  price: Number,
  description: String,
});

const Product = models.Product || model("Product", productSchema);

export default Product;
