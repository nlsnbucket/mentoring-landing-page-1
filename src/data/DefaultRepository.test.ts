import { PrismaClient } from "@prisma/client"
import { defaultErrorMap } from "zod"
import { DefaultRepository } from "./DefaultRepository"

describe("DefaultRepository", () => {
  let prisma: PrismaClient
  let defaultRepository: DefaultRepository

  beforeAll(() => {
    prisma = new PrismaClient()
    defaultRepository = new DefaultRepository(prisma)
  })

  afterEach(async () => {
    await prisma.subscriptionInterest.deleteMany({})
    await prisma.subscriptionExperience.deleteMany({})
    await prisma.experience.deleteMany({})
    await prisma.interest.deleteMany({})
    await prisma.subscription.deleteMany({})
  })

  describe("email", () => {
    it("should insert first email", async () => {
      const { subscription, status } = await defaultRepository.upsert({
        ip: "ip",
        email: "test@mail.com",
      })

      expect(subscription.email).toBe("test@mail.com")
      expect(subscription.ip).toBe("ip")

      expect(status).toBe("created")
    })

    it("should insert second email", async () => {
      await defaultRepository.upsert({
        ip: "ip",
        email: "existingtest@mail.com",
      })
      const { subscription, status } = await defaultRepository.upsert({
        ip: "ip",
        email: "test@mail.com",
      })

      expect(subscription.email).toBe("test@mail.com")
      expect(subscription.ip).toBe("ip")

      expect(status).toBe("created")
    })

    it("should update existing email", async () => {
      await defaultRepository.upsert({
        ip: "ip",
        email: "test@mail.com",
      })

      const { status } = await defaultRepository.upsert({
        ip: "ip",
        email: "test@mail.com",
      })
      expect(status).toBe("updated")
    })
  })

  describe("interests", () => {
    it("should insert interests", async () => {
      const { subscription } = await defaultRepository.upsert({
        ip: "ip",
        email: "test@mail.com",
        interests: ["interest 1", "interest 2"],
      })

      expect(subscription.interests.length).toBe(2)
      expect(subscription.interests).toContainEqual({
        id: expect.anything(),
        value: "interest 1",
      })
      expect(subscription.interests).toContainEqual({
        id: expect.anything(),
        value: "interest 2",
      })
    })

    it("should update interests", async () => {
      await defaultRepository.upsert({
        ip: "ip",
        email: "test@mail.com",
        interests: ["interest 1", "interest 2"],
      })

      const { subscription } = await defaultRepository.upsert({
        ip: "ip",
        email: "test@mail.com",
        interests: ["interest 3"],
      })

      const existingInterests = await prisma.interest.findMany({})

      expect(existingInterests.length).toBe(3)

      expect(subscription.interests.length).toBe(1)
      expect(subscription.interests).toContainEqual({
        id: expect.anything(),
        value: "interest 3",
      })
    })
  })

  describe("experiences", () => {
    it("should insert experience", async () => {
      const { subscription } = await defaultRepository.upsert({
        ip: "ip",
        email: "test@mail.com",
        experiences: ["experience 1", "experience 2"],
      })

      expect(subscription.experiences.length).toBe(2)
      expect(subscription.experiences).toContainEqual({
        id: expect.anything(),
        value: "experience 1",
      })
      expect(subscription.experiences).toContainEqual({
        id: expect.anything(),
        value: "experience 2",
      })
    })

    it("should update experience", async () => {
      await defaultRepository.upsert({
        ip: "ip",
        email: "test@mail.com",
        experiences: ["experience 1", "experience 2"],
      })

      const { subscription } = await defaultRepository.upsert({
        ip: "ip",
        email: "test@mail.com",
        experiences: ["experience 3"],
      })

      const existingExperiences = await prisma.experience.findMany({})

      expect(existingExperiences.length).toBe(3)

      expect(subscription.experiences.length).toBe(1)
      expect(subscription.experiences).toContainEqual({
        id: expect.anything(),
        value: "experience 3",
      })
    })
  })
})
