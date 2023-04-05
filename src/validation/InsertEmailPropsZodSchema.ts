import { z } from "zod"
import { EmailZodSchema } from "./EmailZodSchema"
import { IpZodSchema } from "./IpZodSchema"

export const InsertEmailPropsZodSchema = z.object({
  email: EmailZodSchema,
  ip: IpZodSchema,
})
