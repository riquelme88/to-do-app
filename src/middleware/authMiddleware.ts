import { NextFunction, Request, RequestHandler, Response } from 'express'
import jwt from 'jsonwebtoken'
import { findUserByToken } from '../services/user'
import { ExtendedRequest } from '../types/extendedRequest'
import { secretKey } from '../config/secretKey'

export const payload = (email: string) => {
    return jwt.sign(email, secretKey.secret as string)
}

export const middleware = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const header = req.headers['authorization']

    if (!header) return res.status(401).json({ error: 'Mande um header' })

    const token = header?.split(' ')[1]

    const verify = jwt.verify(token as string, process.env.SECRET_KEY as string,
        async (error, decoded: any) => {
            if (error) return res.json({ error })

            const user = await findUserByToken(token as string)
            if (!user) return res.status(401).json({ error: 'Acesso negado' })

            req.userEmail = user.email as string
            next()
        }
    )
}