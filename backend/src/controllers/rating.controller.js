import Rating from "../models/rating.model.js";

export const rateMovie = async (req, res) => {
  const { movieId, score } = req.body
  const userId = req.user.id // Tomamos su JWT
  try {
    if(!movieId || score == null) return res.status(400).json({ message: "moveId y score son requeridos" })
        
    let ratingFound = await Rating.findOne({userId, movieId})

    if(ratingFound){
        ratingFound.score = score
        await ratingFound.save()
        return res.json({ message: "Calificación actualizada", ratingFound })
    }

    const newRating = new Rating({ userId, movieId, score })
    await newRating.save()
    res.status(201).json({ message: "Calificación guardada", ratinFound: newRating })
  
    } catch (error) {
       res.status(500).json({message: error.message})
  }
}

export const promedio = async (req, res) => {
  const { movieId } = req.params;
  
  // Caculamos el promedio con aggregate
  try {
    const result = await Rating.aggregate([
      { $match: { movieId } }, // Filtra por peli
      { $group: {
        _id: "$movieId",
        promedio: {$avg: "$score"},
        total: { $sum: 1} }
      }
    ])

  if(result.length === 0){
    return res.json({movieId, promedio:0, total:0});
  }

  res.json({
    movieId,
    promedio: result[0].promedio.toFixed(1),
    total: result[0].total
  })
  } catch(error){
    res.status(500).json({message: error.message})
  }
}