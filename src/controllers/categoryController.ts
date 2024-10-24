import { Response } from "express";
import { ExtendedRequest } from "../types/typeUser";
import { findUserByEmail } from "../services/user";
import { categorySchema } from "../schemas/categorySchema";
import { findByCategory } from "../services/category";

export const getCategory = async (req: ExtendedRequest, res: Response) => {
    const safeData = categorySchema.safeParse(req.query)
    if (!safeData.success) { return res.json({ error: safeData.error.flatten().fieldErrors }) }

    const userEmail = req.userEmail

    const user = await findUserByEmail(userEmail as string)
    if (!user) { return res.json({ error: 'Ocorreu algum erro' }) }

    const tasks = await findByCategory(safeData.data.category as string, user.id)
    if (!tasks) { return res.json({ error: 'Categoria não encontrada!' }) }

    res.json({ tasks })
}