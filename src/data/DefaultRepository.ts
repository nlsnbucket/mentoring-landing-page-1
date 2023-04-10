import { PrismaClient } from "@prisma/client"
import { InsertEmailProps } from "./interfaces/InsertEmailProps.interface"
import { UspsertOutput } from "./interfaces/UpsertOutput"

export class DefaultRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async find(email: string) {
    return this.prisma.subscription.findFirst({ where: { email } })
  }

  async upsert({
    ip,
    email,
    comments,
    interests,
    experiences,
  }: InsertEmailProps): Promise<UspsertOutput> {
    return await this.prisma.$transaction(async (transaction) => {
      let allInterests = await transaction.interest.findMany({})
      let allExperiences = await transaction.experience.findMany({})

      await transaction.interest.createMany({
        data:
          interests
            ?.filter(
              (interest) =>
                allInterests.find(
                  (exisingInterest) => exisingInterest.value === interest
                ) === undefined
            )
            .map((interest) => ({
              value: interest,
            })) ?? [],
      })

      await transaction.experience.createMany({
        data:
          experiences
            ?.filter(
              (experience) =>
                allExperiences.find(
                  (existingExperience) =>
                    existingExperience.value === experience
                ) === undefined
            )
            .map((experience) => ({
              value: experience,
            })) ?? [],
      })

      allInterests = await transaction.interest.findMany({})
      allExperiences = await transaction.experience.findMany({})

      const existingSubcription = await transaction.subscription.findFirst({
        where: { email },
      })

      let upsertedSubscription = await transaction.subscription.upsert({
        create: { ip, email, comments },
        update: {
          ip,
          email,
          comments,
        },
        where: {
          email,
        },
      })

      await transaction.subscriptionInterest.deleteMany({
        where: {
          subscriptionId: upsertedSubscription.id,
        },
      })
      await transaction.subscriptionExperience.deleteMany({
        where: {
          subscriptionId: upsertedSubscription.id,
        },
      })

      const interestsToConnect = allInterests.filter(
        (insertedInterest) =>
          interests?.find((interest) => interest === insertedInterest.value) !==
          undefined
      )
      const experiencesToConnect = allExperiences.filter(
        (insertedExperience) =>
          experiences?.find(
            (experience) => experience === insertedExperience.value
          ) !== undefined
      )

      await transaction.subscriptionInterest.createMany({
        data: interestsToConnect.map((interest) => ({
          interestId: interest.id,
          subscriptionId: upsertedSubscription.id,
        })),
      })

      await transaction.subscriptionExperience.createMany({
        data: experiencesToConnect.map((experience) => ({
          experienceId: experience.id,
          subscriptionId: upsertedSubscription.id,
        })),
      })

      const subscription = {
        ...upsertedSubscription,
        interests: interestsToConnect,
        experiences: experiencesToConnect,
      }

      return {
        subscription,
        status: existingSubcription !== null ? "updated" : "created",
      }
    })
  }
}
