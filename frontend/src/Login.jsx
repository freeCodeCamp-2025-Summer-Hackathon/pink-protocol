import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod'

import { z } from 'zod'

const loginUserSchema = z.object({
  email: z.email()
    .nonempty('Email is required!')
    .email('Invalid email format'),
  password: z.string()
    .nonempty('Password is required!'),
});