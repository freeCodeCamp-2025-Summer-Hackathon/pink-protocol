import { z } from 'zod'

export const signupUserSchema = z
  .object({
    name: z
      .string()
      .nonempty('🍯 Name must bee filled!')
      .min(3, '🍯 Name must bee at least 3 characters long!')
      .max(50, "🍯 Name can't bee longer than 50 characters!"),
    email: z
      .email("🍯 That doesn't look like a valid email address!")
      .nonempty('🍯 Email must bee filled!'),
    username: z
      .string()
      .nonempty('🍯 Username must bee filled!')
      .min(3, '🍯 Username must bee at least 3 characters long!')
      .max(20, "🍯 Username can't bee longer than 20 characters!"),
    password: z
      .string()
      .nonempty('🍯 Password must bee filled!')
      .min(8, '🍯 Password must bee at least 8 characters long!')
      .max(20, "🍯 Password can't bee longer than 20 characters!")
      .regex(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,20}$/,
        "🍯 Don't get kicked from the hive — your password needs some sting: 8‑20 chars, upper, lower, number, symbol."
      ),
    confirm_password: z.string().nonempty('🍯 Please confirm your password!'),
  })
  .refine((d) => d.password === d.confirm_password, {
    message: "🍯 Passwords must match — we can't have rebels in the hive.",
    path: ['confirm_password'],
  })
