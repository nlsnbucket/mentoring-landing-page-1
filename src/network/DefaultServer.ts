import express, { Express } from "express"
import { DefaultRepository } from "../data/DefaultRepository"
import { InsertEmailMiddleware } from "../validation/InsertEmailMiddlewareValidator"
import { InsertEmailPropsZodSchema } from "../validation/InsertEmailPropsZodSchema"

export class DefaultServer {
  constructor(
    public readonly server: Express,
    private readonly defaultRepository: DefaultRepository
  ) {}

  setup() {
    this.servePublic()
    this.serveRegisterEmailRoute()
    return this
  }

  private servePublic() {
    this.server.use(express.static("public"))
  }

  private serveRegisterEmailRoute() {
    this.server.post(
      "/subscribe",
      InsertEmailMiddleware,
      async (request, response) => {
        const { email } = request.body
        const ip = request.socket.remoteAddress

        const insertEmailProps = InsertEmailPropsZodSchema.parse({
          ip,
          email,
        })

        const insertedRegisteredEmail =
          await this.defaultRepository.insertEmail(insertEmailProps)

        return response
          .json({
            email: insertedRegisteredEmail.value,
          })
          .send()
      }
    )
  }
}
