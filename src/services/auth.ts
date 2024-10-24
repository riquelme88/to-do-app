import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const newUser = async (data: Prisma.UserCreateInput) => {
    return await prisma.user.create({ data })
}

export const getUser = async (email: string) => {
    return await prisma.user.findFirst({ where: { email } })
}