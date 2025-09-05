import Lista from "../models/list.model.js";

// Crear lista
export const createList = async (req, res) => {
  const { nombre, peliculas } = req.body;
  const usuarioId = req.user.id;
  try {
    if (!nombre) return res.status(400).json({ message: "El nombre de la lista es requerido" });

    const idsUnicos = new Set((peliculas || []).map(p => p.movieId));
    if (peliculas && idsUnicos.size !== peliculas.length) {
      return res.status(400).json({ message: "No se permiten películas duplicadas en la lista" });
    }

    const nuevaLista = new Lista({ nombre, peliculas: peliculas || [], usuarioId });
    await nuevaLista.save();
    res.status(201).json({ message: "Lista creada con éxito", lista: nuevaLista });
  } catch (error) {
    if (error.code === 11000) return res.status(400).json({ message: "Ya tienes una lista con ese nombre" });
    res.status(500).json({ message: error.message });
  }
};

// Obtener listas del usuario
export const getUserLists = async (req, res) => {
  const usuarioId = req.user.id;
  try {
    const listas = await Lista.find({ usuarioId }).sort({ createdAt: -1 });
    res.json({ listas: listas || [] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Agregar película a lista
export const addMovieToList = async (req, res) => {
  const { listId } = req.params;
  const { movie } = req.body;
  const usuarioId = req.user.id;

  if (!movie || !movie.id) return res.status(400).json({ message: "Datos de película incompletos" });

  try {
    const lista = await Lista.findOne({ _id: listId, usuarioId });
    if (!lista) return res.status(404).json({ message: "Lista no encontrada" });

    const existe = lista.peliculas.some(p => p.movieId === movie.id.toString());
    if (existe) return res.status(400).json({ message: "La película ya está en la lista" });

    lista.peliculas.push({
      movieId: movie.id.toString(),
      titulo: movie.title,
      poster_path: movie.poster_path
    });

    await lista.save();
    res.json(lista);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
