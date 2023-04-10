import { z } from "zod"
import { validateRequest } from "zod-express-middleware"
import { CommentsZodSchema } from "./CommentsZodSchema"
import { EmailZodSchema } from "./EmailZodSchema"
import { ExperiecesZodSchema } from "./ExperiecesZodSchema"
import { InterestsZodSchema } from "./InterestsZodSchema"

export const InsertEmailMiddleware = validateRequest({
  body: z.object({
    email: EmailZodSchema,
    comments: CommentsZodSchema.optional(),
    interests: InterestsZodSchema.optional(),
    experiences: ExperiecesZodSchema.optional(),
  }),
})
