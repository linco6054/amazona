import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },

    category: { type: String, reuired: true },
    image: { type: String, reuired: true },
    price: { type: Number, reuired: true },
    countInStock: { type: Number, reuired: true },
    brand: { type: String, reuired: true },
    rating: { type: Number, reuired: true },
    numReviewes: { type: Number, reuired: true },
    description: { type: String, reuired: true },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", productSchema);

export default Product;
