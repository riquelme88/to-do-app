import { z } from "zod";

export const createTaskSchema = z.object({
    task: z.string({ message: 'Mande o nome da task' }).min(2, { message: 'A task tem que conter no minimo duas letras' }),
    completed: z.boolean().optional(),
    category: z.string({ message: 'Mande a categoria da task' })
})

export const updateTaskSchema = z.object({
    task: z.string().min(2, { message: "A task deve conter no minimo 2 caracteres" }).optional(),
    category: z.string().min(2, { message: 'A categoria deve conter no minimo 2 caracteres' }).optional(),
})

export const nameTaskSchema = z.object({
    name: z.string({ message: "Mande o nome" }).min(2, { message: "A task deve conter no minimo 2 caracteres" })
})
