import { PrismaClient } from "@prisma/client"
import { InsertEmailProps } from "./interfaces/InsertEmailProps.interface"

export class DefaultRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async insertEmail({ ip, email }: InsertEmailProps) {
    return this.prisma.registeredEmail.create({
      data: {
        ip,
        value: email,
      },
    })
  }
}
