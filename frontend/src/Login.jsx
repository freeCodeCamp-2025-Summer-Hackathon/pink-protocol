import {
  EyeIcon,
  EyeSlashIcon,
  SwatchIcon,
  UserGroupIcon,
  SparklesIcon,
} from '@heroicons/react/24/solid'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { z } from 'zod'

const loginUserSchema = z.object({
  email: z.email('Invalid email format').nonempty('Email is required!'),
  password: z.string().nonempty('Password is required!'),
})
