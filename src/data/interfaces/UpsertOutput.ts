import { CompleteSubscription } from "./CompleteSubscription"

export interface UspsertOutput {
  subscription: CompleteSubscription
  status: "created" | "updated"
}
