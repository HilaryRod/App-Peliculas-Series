import { Router } from "express";
import { getPopularMovies } from "../controllers/movie.controller.js";

const router = Router();

router.get("/popular", getPopularMovies);

export default router;
