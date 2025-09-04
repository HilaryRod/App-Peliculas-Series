import Resena from "../models/resenas.model.js";
import Rating from "../models/rating.model.js";

export const agregarResena = async (req, res) => {
  const { movieId, texto } = req.body
  const userId = req.user.id // Tomamos su JWT
  try {
    if(!movieId || !texto) return res.status(400).json({ message: "moveId y texto son requeridos" })
        
    const resena = new Resena({ userId, movieId, texto });
    await resena.save()

    res.status(201).json({ message: "Reseña agregada", resena })
    } catch (error) {
       res.status(500).json({message: error.message})
  }
}

export const obtenerResena = async (req, res) => {
  const { movieId } = req.params;
  
  try {
    const resenasEncontradas = await Resena.find({ movieId })
      .populate("userId", "username")
      .sort({ createdAt: -1 })

    if (resenasEncontradas.length === 0) {
      return res.json({ resenas: [] })
    }

    const resenasConRating = await Promise.all(
      resenasEncontradas.map(async (resena) => {
        const rating = await Rating.findOne({ movieId, userId: resena.userId._id });
        return {
          _id: resena._id,
          user: resena.userId.username,
          texto: resena.texto,
          fecha: resena.createdAt,
          rating: rating ? rating.score :null, //"Usuario no ha calificado" //podemos poner null
        };
      })
    );

    res.json({ resenas: resenasConRating });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
