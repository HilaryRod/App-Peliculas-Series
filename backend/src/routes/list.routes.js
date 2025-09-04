import { Router } from "express";
import { createList, getUserLists } from "../controllers/list.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

// Validamos que el usuario esté registrado 
// crear lista de una pelicula
router.post("/", authRequired, createList);

// obtener listas del usuario
router.get("/", authRequired, getUserLists);


/* Para verificar en Thunder client: 
    Para agregar una reseña se debe de estar el usuario registrado
    y en el estado login: 
    POST -> http://localhost:3000/api/lists

    {
        "nombre": "Las volvería a ver",
        "peliculas": [
            { "movieId": "911430 ", "titulo": "F1 la película", "poster": "/6u4APbFBTcu3ieWBzFdyaGMLC9O.jpg" },
            { "movieId": "1087192", "titulo": "Cómo entrenar a tu dragón", "poster": "/kjQXYc2Abhy3TBgAZGzJRhN1JaV.jpg" }
        ]
    }

    Para obtener las reseñas de una pelicula:
    GET -> http://localhost:3000/api/lists
 */
export default router;