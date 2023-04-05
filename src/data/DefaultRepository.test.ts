import { PrismaClient } from "@prisma/client"
import { DefaultRepository } from "./DefaultRepository"

describe("DefaultRepository", () => {
  let prisma: PrismaClient
  let defaultRepository: DefaultRepository

  beforeAll(() => {
    prisma = new PrismaClient()
    defaultRepository = new DefaultRepository(prisma)
  })

  afterEach(async () => {
    await prisma.registeredEmail.deleteMany({})
  })

  describe("registered email", () => {
    it("should insert single email", async () => {
      const insertedEmail = await defaultRepository.insertEmail({
        ip: "ip",
        email: "test@mail.com",
      })

      expect(insertedEmail.value).toBe("test@mail.com")
      expect(insertedEmail.ip).toBe("ip")
    })

    it("should insert second email", async () => {
      await defaultRepository.insertEmail({
        ip: "ip",
        email: "existingtest@mail.com",
      })
      const insertedEmail = await defaultRepository.insertEmail({
        ip: "ip",
        email: "test@mail.com",
      })

      expect(insertedEmail.value).toBe("test@mail.com")
      expect(insertedEmail.ip).toBe("ip")
    })

    it("should not insert existing email", async () => {
      await defaultRepository.insertEmail({
        ip: "ip",
        email: "test@mail.com",
      })

      expect(async () => {
        await defaultRepository.insertEmail({
          ip: "ip",
          email: "test@mail.com",
        })
      }).rejects.toThrow()
    })
  })
})
