import Usuario from "../models/usuario.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

/* Prueba de que funciona */
/* POST -> http://localhost:3000/api/auth/register */
export const register = async (req, res) => {
  const { email, password, username } = req.body
  try {
    const passwordHash = await bcrypt.hash(password, 10)

    const newUser = new Usuario({
      username,
      email,
      password: passwordHash
    })
    const userSaved = await newUser.save()

    /* La información se guarda en la cokiee */
    jwt.sign ({
        id: userSaved._id
    },
    process.env.SECRET_KEY,
    {
        expiresIn: "1d"
    },
    (err, token) => {
        if(err) console.log(err)
        res.cookie("token", token)
    
        /* Propiedades que quiero enviar al usuario */
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
            })
        
    }     
)
        
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body
  console.log("Login request:", req.body);

  try {
    const userFound = await Usuario.findOne({email})
    if(!userFound) return res.status(400).json({message: "Usuario no encontrado"})
    
    const isMatch = await bcrypt.compare(password, userFound.password)
    if(!isMatch) return res.status(400).json({message: "Contraseña incorrecta"})
    
    jwt.sign({
      id: userFound._id
    },
      process.env.SECRET_KEY,
      {
        expiresIn: "1d"
      },
      (err, token) => {
        if (err) console.log(err)
        res.cookie("token", token,{
            httpOnly:true,
            secure:false,
            sameSite:"lax",
        })
        res.json({
        user:{
          id: userFound._id,
          username: userFound.username,
          email: userFound.email,
          createdAt: userFound.createdAt,
          updatedAt: userFound.updatedAt,
      }})
      }
    )
  } catch (error) {
    res.status(500).json({message: error.message}) 
  }
}

export const logout = (req, res) => {
    res.cookie("token", "", {
        httpOnly:true,
        secure:false,
        sameSite:"lax",
        expires: new Date(0)
    })
    return res.sendStatus(200)
}

export const profile = async (req, res) => {
  const userFound = await Usuario.findById(req.user.id)
  if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" })

  return res.json({
   user:{
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  }})
} 