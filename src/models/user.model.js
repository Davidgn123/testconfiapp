import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    tipoIdentificacion: {
        type: String,
        required: true,
        trim: true
    },
    numerodeIdentificacion: {
        type: Number,
        required: true,
        trim: true
    },
    telefono: {
        type: Number,
        required: true,
        trim: true
    },
    nombres: {
        type: String,
        required: true,
        trim: true
    },
    apellidos: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        default: "tutor" // Establece el valor predeterminado del campo de rol como "tutor"
    }
}, {
    timestamps: true
});

export default mongoose.model('User', userSchema);
