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
    await prisma.registeredEmail.deleteMany({})
  })

  describe("route subscribe", () => {
    it("should insert email", async () => {
      const response = await request(server.expressServer)
        .post("/subscribe")
        .send({ email: "test@mail.com" })
        .expect(200)

      expect(response.body).toEqual({
        email: "test@mail.com",
      })
    })

    it("should reject exiting email", async () => {
      await request(server.expressServer)
        .post("/subscribe")
        .send({ email: "test@mail.com" })
        .expect(200)

      await request(server.expressServer)
        .post("/subscribe")
        .send({ email: "test@mail.com" })
        .expect(400)
    })

    it("should reject invalid email", async () => {
      await request(server.expressServer)
        .post("/subscribe")
        .send({ email: "test@mail" })
        .expect(400)
    })
  })
})
