import { Router } from "express";
import { getPopularMovies, getMovieById} from "../controllers/movie.controller.js";

const router = Router();

router.get("/popular", getPopularMovies);
router.get("/:id", getMovieById);

export default router;