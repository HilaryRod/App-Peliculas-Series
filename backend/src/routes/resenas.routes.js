import { Router } from "express";
import { agregarResena, obtenerResena } from "../controllers/resena.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

// Validamos que el usuario esté registrado 
// crear reseña de una pelicula
router.post("/", authRequired, agregarResena);

// obtener reseñas de una pelicula
router.get("/:movieId", obtenerResena);


/* Para verificar en Thunder client: 
    Para agregar una reseña se debe de estar el usuario registrado
    y en el estado login: 
    POST -> http://localhost:3000/api/review

    Para obtener las reseñas de una pelicula:
    GET -> http://localhost:3000/api/review/911430
 */
export default router;