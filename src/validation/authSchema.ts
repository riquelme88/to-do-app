import { z } from "zod";

export const addUserSchema = z.object({
    name: z.string({ message: "Nome é obrigatorio" }).min(2, 'Nome com no minimo 2 caracteres'),
    email: z.string({ message: "Mande um e-mail" }).email({ message: 'Email inválido' }),
    password: z.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#!])[0-9a-zA-Z$*&@#!]{8,}$/,
        { message: 'A senha deve conter no minimo uma letra maiuscula um numero e um simbolo' }).min(8, { message: "A senha deve conter no minimo 8 caracteres" }),
    token: z.string().optional()
})

export const loginUserSchema = z.object({
    email: z.string({ message: "Mande um email" }).email({ message: "Mande um email válido" }),
    password: z.string({ message: 'Mande uma senha' }).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#!])[0-9a-zA-Z$*&@#!]{8,}$/,
        { message: 'A senha deve conter no minimo uma letra maiuscula um numero e um simbolo' }).min(8, { message: "A senha deve conter no minimo 8 caracteres" }),
})