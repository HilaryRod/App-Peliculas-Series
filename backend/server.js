import express from "express";
import dotenv from "dotenv";
import router from "./routes/index.js";

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use("/api", router)


app.listen(PORT, () => {
  console.log("Aplicación corriendo en puerto", PORT);
})
