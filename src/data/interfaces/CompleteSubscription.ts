import { Experience, Interest, Subscription } from "@prisma/client"

export type CompleteSubscription = Subscription & {
  interests: Interest[]
  experiences: Experience[]
}
