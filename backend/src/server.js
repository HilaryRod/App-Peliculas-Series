import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import {config} from "dotenv"
import router from "./routes/index.js"
import movieRoutes from "./routes/movie.routes.js"
import authRoutes from "./routes/auth.routes.js"
import ratingRoutes from "./routes/rating.routes.js"
import cookieParser from "cookie-parser"

config()

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(cors())
app.use(cookieParser()) 

//Llamada a rutas
app.use("/api", router)
app.use("/api/movies", movieRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/ratings", ratingRoutes) 
app.use(express.static("public")) //Para verificar si sirve la api pelis, html


/* Conectar Mongoose */
mongoose.connect(process.env.MONGODB_KEY)
  .then (() => console.log("Conectado a MongoDB"))
  .catch(err => console.error("Error al conectar a MongoDB:", err))

app.listen(PORT, () => {
  console.log("Servidor corriendo en el puerto", PORT);
})