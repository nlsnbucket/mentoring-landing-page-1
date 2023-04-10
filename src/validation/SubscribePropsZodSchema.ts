import { z } from "zod"
import { CommentsZodSchema } from "./CommentsZodSchema"
import { EmailZodSchema } from "./EmailZodSchema"
import { ExperiecesZodSchema } from "./ExperiecesZodSchema"
import { InterestsZodSchema } from "./InterestsZodSchema"
import { IpZodSchema } from "./IpZodSchema"

export const SubscribePropsZodSchema = z.object({
  email: EmailZodSchema,
  ip: IpZodSchema,
  comments: CommentsZodSchema.optional(),
  interests: InterestsZodSchema.optional(),
  experiences: ExperiecesZodSchema.optional(),
})
