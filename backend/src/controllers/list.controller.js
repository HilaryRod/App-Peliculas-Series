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
  const usuarioId = req.user.id;
  try {
    const listas = await Lista.find({ usuarioId }).sort({ createdAt: -1 });

    // Siempre devolvemos un objeto con la propiedad 'listas'
    res.json({ listas: listas || [] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const addMovieToList = async (req, res) => {
  const { listId } = req.params;
  const { movie } = req.body;
  const usuarioId = req.user.id;

  if (!movie || !movie.id) {
    return res.status(400).json({ message: "Datos de película incompletos" });
  }

  try {
    const lista = await Lista.findOne({ _id: listId, usuarioId });
    if (!lista) return res.status(404).json({ message: "Lista no encontrada" });

    const existe = lista.peliculas.some(p => p.movieId === movie.id.toString());
    if (existe) return res.status(400).json({ message: "La película ya está en la lista" });

    lista.peliculas.push({
      movieId: movie.id.toString(),
      titulo: movie.title || movie.titulo,
      poster_path: movie.poster_path || movie.poster,
    });

    await lista.save();
    return res.json(lista); // <-- Muy importante, siempre devolver JSON
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
