import { PrismaClient } from "@prisma/client"

export const prismaClient = () => {
  const prisma = new PrismaClient({
    log: ["error", "info", "query", "warn"],
  })
  return prisma
}
