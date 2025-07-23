import { z } from 'zod'

export const loginUserSchema = z.object({
  email: z.email('🍯 Invalid email format! Try again!').nonempty('🍯 Email must bee filled!'),
  password: z.string().nonempty('🍯 Password must bee filled!'),
})
