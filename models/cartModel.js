import mongoose from "mongoose";
import Joi from "joi";

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'User reference is required']
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product',
    required: [true, 'At least one product reference is required']
  }],
  totalPrice: {
    type: Number,
    required: [true, 'Total price is required'],
    min: [0, 'Total price cannot be negative']
  }
}, { timestamps: true });


const validateCart = (data) => {
  const schema = Joi.object({
    user: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(), // Must be a valid MongoDB ObjectId
    products: Joi.array()
      .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)) // Each must be a valid ObjectId
      .min(1)
      .required(),
    totalPrice: Joi.number().min(0).required()
  });
  return schema.validate(data);
};

export default mongoose.model("cart", cartSchema);
export { validateCart };