import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    peliculas: [
        {
            movieId: { type: String, required: true},
            titulo: {type: String, required: true},
            poster_path: { type: String },
        }
    ],
    usuarioId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Usuario", 
        required: true
    }
}, { 
    timestamps:true 
})

listSchema.index({ nombre: 1, usuarioId: 1}, { unique:true })

export default mongoose.model("Lista", listSchema)