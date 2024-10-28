import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      Required: true,
    },
    price: {
      type: Number,
      Required: true,
    },
    description: {
      type: String,
      Required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("products", productSchema);

export default Product;
