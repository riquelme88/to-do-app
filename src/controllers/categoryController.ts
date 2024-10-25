import { Response } from "express";
import { ExtendedRequest } from "../types/extendedRequest";
import { findUserByEmail } from "../Model/user";
import { categorySchema } from "../validation/categorySchema";
import { findByCategory } from "../Model/category";

export const getCategory = async (req: ExtendedRequest, res: Response) => {
    const safeData = categorySchema.safeParse(req.query)
    if (!safeData.success) return res.status(400).json({ error: safeData.error.flatten().fieldErrors })

    const userEmail = req.userEmail

    const user = await findUserByEmail(userEmail as string)
    if (!user) return res.status(400).json({ error: 'Ocorreu algum erro' })

    const tasks = await findByCategory(safeData.data.category as string, user.id)
    if (!tasks) return res.status(400).json({ error: 'Categoria não encontrada!' })

    res.json({ tasks })
}