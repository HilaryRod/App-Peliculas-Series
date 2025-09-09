import { Router } from "express";
import { rateMovie, promedio, userRating} from "../controllers/rating.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

// Validamos que el usuario esté registrado 
// Guardar calificación
router.post("/", authRequired, rateMovie);

// Para obtener el promedio de un peli
router.get("/:movieId/promedio", promedio);

// Obtener calificación del usuario
router.get("/:movieId/user", authRequired, userRating);


/* Para verificar en Thunder cliente: 
    Para agregar un rating se debe de estar el usuario registrado
    y en el estado login: 
    POST -> http://localhost:3000/api/ratings

    Para ver el promedio de una pelicula:
    GET -> http://localhost:3000/api/ratings/911430/promedio

    Para obtener el raiting del usuario:
    GET -> http://localhost:3000/api/ratings/911430/user
 
*/
export default router;