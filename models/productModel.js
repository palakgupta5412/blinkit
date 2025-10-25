import mongoose from "mongoose";
import Joi from "joi";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    minlength: [2, 'Product name must be at least 2 characters long']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
  },
  stock: {
    type: Boolean,
    required: [true, 'Stock status is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    minlength: [5, 'Description must be at least 5 characters long']
  },
  image: {
    type: String,
    required: [true, 'Product image URL is required'],
}
}, { timestamps: true });

const validateProduct = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    price: Joi.number().min(0).required(),
    category: Joi.string().min(2).required(),
    stock: Joi.boolean().required(),
    description: Joi.string().min(5).required(),
    image: Joi.string().uri().required()
  });
  return schema.validate(data, { abortEarly: false });
};

export default mongoose.model("product", productSchema);
export { validateProduct };