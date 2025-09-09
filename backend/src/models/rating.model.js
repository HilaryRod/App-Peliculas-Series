import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },
    movieId: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        min: 0,
        max: 5,
        required: true,
    }
}, {
    timestamps:true 
})

export default mongoose.model("Rating", ratingSchema)