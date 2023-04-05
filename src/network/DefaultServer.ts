import express, { Express } from "express"
import { DefaultRepository } from "../data/DefaultRepository"
import { InsertEmailMiddleware } from "../validation/InsertEmailMiddlewareValidator"
import { InsertEmailPropsZodSchema } from "../validation/InsertEmailPropsZodSchema"

export class DefaultServer {
  constructor(
    public readonly expressServer: Express,
    private readonly defaultRepository: DefaultRepository
  ) {}

  setup() {
    this.expressServer.use(express.json())

    this.servePublic()
    this.serveRegisterEmailRoute()
    return this
  }

  private servePublic() {
    this.expressServer.use(express.static("public"))
  }

  private serveRegisterEmailRoute() {
    this.expressServer.post(
      "/subscribe",
      InsertEmailMiddleware,
      async (request, response) => {
        const { email } = request.body
        const ip = request.socket.remoteAddress

        const insertEmailProps = InsertEmailPropsZodSchema.parse({
          ip,
          email,
        })

        const existingEmail = await this.defaultRepository.find(email)

        if (existingEmail) {
          return response.status(200).json({
            email: existingEmail.value,
          })
        }

        try {
          const insertedRegisteredEmail =
            await this.defaultRepository.insertEmail(insertEmailProps)

          return response.status(200).json({
            email: insertedRegisteredEmail.value,
          })
        } catch (error) {
          return response.status(400).json({
            error: "Failed to register email",
          })
        }
      }
    )
  }
}
