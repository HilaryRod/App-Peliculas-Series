import { z } from "zod";

export const registerSchema = z.object({
    username: z.string().trim().min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
    email: z.string().email("Correo inválido"),
    password: z.string()
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .max(25)
        .regex(/[A-Z]/, "Debe contener al menos una letra mayúscula")
        .regex(/[0-9]/, "Debe contener al menos un número")
})

export const loginSchema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string()
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .max(25)
        .regex(/[A-Z]/, "Debe contener al menos una letra mayúscula")
        .regex(/[0-9]/, "Debe contener al menos un número")

});