import mongoose from "mongoose";
import Joi from 'joi';

// mongoose validations 
const addressSchema = new mongoose.Schema({
  state: {
    type: String,
    required: [true, 'State is required'],
    minlength: [2, 'State name must be at least 2 characters long']
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    minlength: [2, 'City name must be at least 2 characters long']
  },
  pincode: {
    type: Number,
    required: [true, 'Pincode is required'],
    min: [100000, 'Pincode must be at least 6 digits'],
    max: [999999, 'Pincode cannot exceed 6 digits']
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    minlength: [5, 'Address must be at least 5 characters long']
  }
});

//mongoose validations run automatically before .save command 
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']   //this type regexx works for string only 
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
  },
  phone: {
    type: Number,
    required: [true, 'Phone number is required'],
    validate: {
        // this way regex works for number 
        validator: v => /^\d{10}$/.test(v.toString()),
            message: 'Phone number must be 10 digits'
    }     
  },
  addresses: {
    type: [addressSchema]
  }
}, { timestamps: true });

const validateUser = (data) => {
    //joi validations
    const addressJoiSchema = Joi.object({
      state: Joi.string().min(2).required(),
      city: Joi.string().min(2).required(),
      pincode: Joi.number().integer().min(100000).max(999999).required(),
      address: Joi.string().min(5).required()
    });
    // joi validations
    const userJoiSchema = Joi.object({
      name: Joi.string().min(2).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
      addresses: Joi.array().items(addressJoiSchema).min(1).required()
    });

    return userJoiSchema.validate(data) ;
}

export default mongoose.model("user", userSchema);
export { validateUser }; 