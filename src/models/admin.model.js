import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  nombres: {
    type: String,
    required: true,
    trim: true,
  },
  apellidos: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "admin" // Establece el valor predeterminado del campo de rol como "admin"
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const AdminModel = mongoose.model('Admin', adminSchema);
