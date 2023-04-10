import express, { Express } from "express"
import { PrismaClient } from "@prisma/client"
import request from "supertest"
import { DefaultRepository } from "../data/DefaultRepository"
import { DefaultServer } from "./DefaultServer"

describe("DefaultServer", () => {
  let expressServer: Express
  let prisma: PrismaClient
  let repository: DefaultRepository
  let server: DefaultServer

  beforeAll(() => {
    expressServer = express()
    prisma = new PrismaClient()
    repository = new DefaultRepository(prisma)
    server = new DefaultServer(expressServer, repository)

    server.setup()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  afterEach(async () => {
    await prisma.subscriptionInterest.deleteMany({})
    await prisma.subscriptionExperience.deleteMany({})
    await prisma.experience.deleteMany({})
    await prisma.interest.deleteMany({})
    await prisma.subscription.deleteMany({})
  })

  describe("route subscribe", () => {
    it("should create subscription with email only", async () => {
      const response = await request(server.expressServer)
        .post("/subscribe")
        .send({ email: "test@mail.com" })
        .expect(200)

      expect(response.body).toEqual({
        status: "created",
        subscription: {
          email: "test@mail.com",
          comments: null,
          experiences: [],
          interests: [],
        },
      })
    })

    it("should update email of exiting subscription", async () => {
      await request(server.expressServer)
        .post("/subscribe")
        .send({ email: "test@mail.com" })
        .expect(200)

      await request(server.expressServer)
        .post("/subscribe")
        .send({ email: "test@mail.com" })
        .expect(200)
    })

    it("should reject invalid email", async () => {
      await request(server.expressServer)
        .post("/subscribe")
        .send({ email: "test@mail" })
        .expect(400)
    })

    it("should create subcription with interests", async () => {
      const response = await request(server.expressServer)
        .post("/subscribe")
        .send({
          email: "test@mail.com",
          interests: ["interest 1", "interest 2"],
        })
        .expect(200)

      expect(response.body).toEqual({
        status: "created",
        subscription: {
          email: "test@mail.com",
          comments: null,
          experiences: [],
          interests: ["interest 1", "interest 2"],
        },
      })
    })

    it("should create subcription with experiences", async () => {
      const response = await request(server.expressServer)
        .post("/subscribe")
        .send({
          email: "test@mail.com",
          experiences: ["experience 1", "experience 2"],
        })
        .expect(200)

      expect(response.body).toEqual({
        status: "created",
        subscription: {
          email: "test@mail.com",
          comments: null,
          experiences: ["experience 1", "experience 2"],
          interests: [],
        },
      })
    })
  })
})
