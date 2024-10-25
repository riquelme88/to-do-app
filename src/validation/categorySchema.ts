import { z } from "zod";

export const categorySchema = z.object({
    category: z.string({ message: 'Mande a categoria' }).min(2, { message: 'Categoria deve conter no minimo 2 caracteres' })
})