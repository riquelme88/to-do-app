import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const findByCategory = async (category: string, userId: string) => {
    return prisma.tasks.findMany({
        where: {
            category: {
                equals: category,
                mode: 'insensitive'
            },
            userId
        }
    })
}