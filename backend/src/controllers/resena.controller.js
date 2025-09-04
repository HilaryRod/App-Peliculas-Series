import Resena from "../models/resenas.model.js";

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
  const { movieId } = req.params
  
  try {
    const resenasEncontradas = await Resena.find({ movieId })
        .populate("userId", "username") // Obtiene los datos de usuario
        .sort({ createdAt: -1 })//se corrigio error ortografico 
       
        if(resenasEncontradas.length === 0){
            return res.json({ message: "Esta película no tiene reseñas", resenasEncontradas: [] })
        }

        res.json({resenasEncontradas})
    } catch (error) {
       res.status(500).json({message: error.message})
  }
}