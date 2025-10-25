import mongoose from "mongoose";
import Joi from "joi";

const deliverySchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'order',
    required: [true, 'Order reference is required']
  },
  deliveryBoy: {
    type: String,
    required: [true, 'Delivery boy name is required'],
    minlength: [2, 'Name must be at least 2 characters long']
  },
  status: {
    type: String,
    enum: ['pending', 'shipped', 'out-for-delivery', 'delivered', 'cancelled'],
    default: 'pending',
    required: true
  },
  trackingURL: {
    type: String,
},
  estimatedDeliveryTime: {
    type: Number,
    required: [true, 'Estimated delivery time is required'],
    min: [1, 'Estimated delivery time must be at least 1 hour']
  }
}, { timestamps: true });

const validateDelivery = (data) => {
  const schema = Joi.object({
    order: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    deliveryBoy: Joi.string().min(2).required(),
    status: Joi.string().valid('pending', 'shipped', 'out-for-delivery', 'delivered', 'cancelled').required(),
    trackingURL: Joi.string().uri(),
    estimatedDeliveryTime: Joi.number().min(1).required()
  });

  return schema.validate(data, { abortEarly: false });
};

export default mongoose.model("delivery", deliverySchema);
export { validateDelivery };