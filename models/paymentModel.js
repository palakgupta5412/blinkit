import mongoose from "mongoose";
import Joi from "joi";

const paymentSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'order',
    required: [true, 'Order reference is required']
  },
  amount: {
    type: Number,
    required: [true, 'Payment amount is required'],
    min: [0, 'Amount cannot be negative']
  },
  method: {
    type: String,
    required: [true, 'Payment method is required']
  },
  status: {
    type: String,
    required: true
  },
  transactionId: {
    type: String,
    required: [true, 'Transaction ID is required'],
    unique: true,
  }
}, { timestamps: true });

const validatePayment = (data) => {
  const schema = Joi.object({
    order: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    amount: Joi.number().min(0).required(),
    method: Joi.string().required(),
    status: Joi.string().required(),
    transactionId: Joi.string().min(5).required()
  });
  return schema.validate(data, { abortEarly: false });
};

export default mongoose.model("payment", paymentSchema);
export { validatePayment };
