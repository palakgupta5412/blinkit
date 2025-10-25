import mongoose from "mongoose";
import Joi from "joi";

const orderSchema = new mongoose.Schema({
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
  },
  address: {
    type: String,
    required: [true, 'Delivery address is required'],
    trim: true,
    minlength: [5, 'Address must be at least 5 characters long']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
    required: true
  },
  payment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'payment',
    required: [true, 'Payment reference is required']
  },
  delivery: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'delivery'
  }
}, { timestamps: true });

const validateOrder = (data) => {
  const schema = Joi.object({
    user: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    products: Joi.array().items(Joi.string()).min(1).required(),
    totalPrice: Joi.number().min(0).required(),
    address: Joi.string().min(5).required(),
    status: Joi.string().valid('pending', 'confirmed', 'shipped', 'delivered', 'cancelled').required(),
    payment: Joi.string().required(),
    delivery: Joi.string().allow(null, '')
  });

  return schema.validate(data, { abortEarly: false });
};

export default mongoose.model("order", orderSchema);
export { validateOrder };
