import { z } from "zod"
import { validateRequest } from "zod-express-middleware"
import { EmailZodSchema } from "./EmailZodSchema"

export const InsertEmailMiddleware = validateRequest({
  body: z.object({
    email: EmailZodSchema,
  }),
})
