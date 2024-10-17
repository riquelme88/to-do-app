import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const findUserByEmail = async (email: string) => {
    return await prisma.user.findFirst({ where: { email } })
}