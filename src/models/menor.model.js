import mongoose from "mongoose";

const menorSchema = new mongoose.Schema({
    nombres: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    tipoIdentificacion: {
        type: String,
        required: true
    },
    numeroIdentificacion: {
        type: Number,
        required: true
    },
    edad: {
        type: Number,
        required: true
    },
    telefono: {
        type: Number,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    tutor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', required: true // Hace referencia al modelo de usuario
    }
}
);

export default mongoose.model('Menor', menorSchema);
