import mongoose from "mongoose";

const resenaSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },
    movieId: {
        type: String,
        required: true
    },
    texto:{
        type: String,
        required: true    
    },
    fecha: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps:true 
})

export default mongoose.model("Resena", resenaSchema)