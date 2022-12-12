import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    nome_usuario: {
        type: String,
        required: true,
        unique: true,
    },
    nome_completo: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        required: true,
    },
    data_nascimento: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    senha: {
        type: String,
        required: true,
        minlength: 6,
    },
    foto_perfil: {
        type: String,
        required: true,
        minlength: 6,
    },
    foto_capa: {
        type: String,
        required: true,
        minlength: 6,
    },
    quant_seguidores: {
        type: Number,
        required: true,
    },
    quant_seguindo: {
        type: Number,
        required: true,
    },
});

export default mongoose.model("usuario", userSchema);
