import { z } from "zod"

export const IpZodSchema = z.string().ip()
