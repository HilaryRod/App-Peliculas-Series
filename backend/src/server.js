import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import {config} from "dotenv"
import router from "./routes/index.js"
import movieRoutes from "./routes/movie.routes.js"
import authRoutes from "./routes/auth.routes.js"
import ratingRoutes from "./routes/rating.routes.js"
import resenaRoutes from "./routes/resenas.routes.js"
import listRoutes from "./routes/list.routes.js"
import cookieParser from "cookie-parser"

config()

const app = express()

app.use(express.json())
app.use(cors({
  origin: 'https://app-peliculas-series.vercel.app', // tu frontend
  credentials: true
}))
app.use(cookieParser()) 

//Llamada a rutas
app.use("/api/list", listRoutes);
app.use("/api/movies", movieRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/ratings", ratingRoutes) 
app.use("/api/review", resenaRoutes)
app.use("/api", router)

/* Conectar Mongoose */
mongoose.connect(process.env.MONGODB_KEY)
  .then (() => console.log("Conectado a MongoDB"))
  .catch(err => console.error("Error al conectar a MongoDB:", err))

export default app;