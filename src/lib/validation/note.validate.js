import { z } from 'zod'

export const noteSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(3, { message: 'Title must be at least 3 characters long' })
    .max(50, { message: 'Title must not exceed 50 characters long' }),
  text: z
    .string()
    .min(3, { message: 'Text must be at least 3 characters long' })
    .max(500, { message: 'Text must not exceed 500 characters long' }),
})
