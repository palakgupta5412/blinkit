import mongoose from "mongoose";
import Joi from "joi";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    unique: true,
    minlength: [2, 'Category name must be at least 2 characters long'],
    maxlength: [50, 'Category name cannot exceed 50 characters']
  }
}, { timestamps: true });

const validateCategory = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required()
  });
  return schema.validate(data, { abortEarly: false });
};

export default mongoose.model("category", categorySchema);
export { validateCategory };