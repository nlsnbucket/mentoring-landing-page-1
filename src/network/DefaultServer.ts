import express, { Express } from "express"
import { DefaultRepository } from "../data/DefaultRepository"
import { InsertEmailMiddleware } from "../validation/InsertEmailMiddlewareValidator"
import { SubscribePropsZodSchema } from "../validation/SubscribePropsZodSchema"
import { parseReturnableSubscription } from "./utils/parseReturnableSubscription"

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
        const { email, comments, interests, experiences } = request.body
        const ip = request.socket.remoteAddress

        const insertEmailProps = SubscribePropsZodSchema.parse({
          ip,
          email,
          comments,
          interests,
          experiences,
        })

        try {
          const { subscription, status } = await this.defaultRepository.upsert(
            insertEmailProps
          )

          return response.status(200).json({
            subscription: parseReturnableSubscription(subscription),
            status,
          })
        } catch (error) {
          console.error(error)
          return response.status(400).json({
            error: "Failed to subscribe email.",
          })
        }
      }
    )
  }
}
