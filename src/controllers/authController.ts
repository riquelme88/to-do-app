import { RequestHandler } from "express";
import { addUserSchema, loginUserSchema } from "../schemas/authSchema";
import bcrypt from 'bcrypt'
import { payload } from "../middleware/auth";
import { newUser } from "../services/auth";
import { findUserByEmail } from "../services/user";

export const registerUser: RequestHandler = async (req, res) => {
    const safeData = addUserSchema.safeParse(req.body)
    if (!safeData.success) { res.status(401).json({ error: safeData.error.flatten().fieldErrors }) }

    const hasUser = await findUserByEmail(safeData.data?.email as string)
    if (hasUser) { return res.status(401).json({ error: 'Usuario já existente' }) }

    const password = await bcrypt.hash(safeData.data?.password as string, 10)

    const token = payload(safeData.data?.email as string)

    const user = await newUser({
        name: safeData.data?.name as string,
        email: safeData.data?.email as string,
        password: password,
        token,
    })

    if (!user) { return res.status(401).json({ error: 'Usuario inválido' }) }

    res.status(201).json({ user })

}

export const loginUser: RequestHandler = async (req, res) => {
    const safeData = loginUserSchema.safeParse(req.body)
    if (!safeData.success) { res.status(401).json({ error: safeData.error.flatten().fieldErrors }) }

    const user = await findUserByEmail(safeData.data?.email as string)
    if (!user) { res.status(401).json({ error: 'Email/senha incorreta' }) }

    const password = await bcrypt.compare(safeData.data?.password as string, user?.password as string)
    if (!password) { return res.status(401).json({ error: 'Email/senha incorretos' }) }

    res.json({ user: user?.name, token: user?.token })

}