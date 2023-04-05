import { PrismaClient } from "@prisma/client"
import { DefaultRepository } from "../data/DefaultRepository"

import express from "express"
import { DefaultServer } from "../network/DefaultServer"

export class DefaultModuleFactory {
  private constructor() {}

  static create() {
    const prisma = new PrismaClient()
    const defaultRepository = new DefaultRepository(prisma)

    const server = express()

    return new DefaultServer(server, defaultRepository)
  }
}
