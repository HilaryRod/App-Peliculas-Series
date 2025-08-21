import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import {config} from "dotenv"
import router from "./routes/index.js"
import movieRoutes from "./routes/movie.routes.js"

config()

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(cors())

//Llamada a rutas
app.use("/api", router)
app.use("/api/movies", movieRoutes)

/* Conectar Mongoose */
mongoose.connect(process.env.MONGODB_KEY)
  .then (() => console.log("Conectado a MongoDB"))
  .catch(err => console.error("Error al conectar a MongoDB:", err))

app.listen(PORT, () => {
  console.log("Servidor corriendo en el puerto", PORT);
})
