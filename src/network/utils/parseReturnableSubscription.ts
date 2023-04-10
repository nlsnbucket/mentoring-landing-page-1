import { CompleteSubscription } from "../../data/interfaces/CompleteSubscription"

export const parseReturnableSubscription = (
  subscription: CompleteSubscription
) => ({
  email: subscription.email,
  comments: subscription.comments,
  interests: subscription.interests.map((interest) => interest.value),
  experiences: subscription.experiences.map((experience) => experience.value),
})
