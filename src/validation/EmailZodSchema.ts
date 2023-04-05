import { z } from "zod"

export const EmailZodSchema = z.string().email()
