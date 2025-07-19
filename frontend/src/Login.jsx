import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { EyeIcon, EyeSlashIcon, SwatchIcon, UserGroupIcon, SparklesIcon } from "@heroicons/react/24/solid"
import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"

const loginUserSchema = z.object({
  email: z.email().nonempty("Email is required!").email("Invalid email format"),
  password: z.string().nonempty("Password is required!"),
})


