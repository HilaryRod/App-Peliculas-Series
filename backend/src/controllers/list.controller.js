import Lista from "../models/list.model.js";

// Publicar una nueva lista
export const createList = async (req, res) => {
  const { nombre, peliculas } = req.body
  const usuarioId = req.user.id // Tomamos su JWT
  try {
    if(!nombre) { 
        return res.status(400).json({ message: "El nombre de la lista es requerido" })
    }

    // Validacón de duplicados en base a la creación de un arreglo con ids unicos
    const idsUnicos = new Set( peliculas.map(p => p.movieId));
    if (idsUnicos.size !== peliculas.length){ 
        return res.status(400).json({ message: "No se permiten películas duplicadas en la lista" })
    }
    
    // Creacón de lista
    const nuevaLista = new Lista({ nombre, peliculas, usuarioId })
    await nuevaLista.save()
    res.status(201).json({ message: "Lista creada con éxito", lista: nuevaLista })
    } catch (error) {

        // 11000 es el código de error que MongoDB lanza cuando hay un duplicado 
        // en un campo que debería ser único.
        if (error.code === 11000){
            return res.status(400).json({ message: "Ya tienes una lista con ese nombre" })
        }

       res.status(500).json({message: error.message})
  }
}

// Obtener todas las listas con el usuario autenticado
export const getUserLists = async (req, res) => {
  const usuarioId = req.user.id
  try {
    const listas = await Lista.find({ usuarioId }).sort({createAt: -1})

    if (listas.length === 0) {
      return res.json({ message: "No tienes listas creadas aún", listas: [] })
    }

    res.json(listas)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};