import jwt from 'jsonwebtoken'

export const payload = (email: string) => {
    return jwt.sign(email, process.env.SECRET_KEY as string)
}