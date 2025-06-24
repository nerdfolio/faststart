"use server"
import { getServerEnv } from "cloudflare-context/solidstart/env"

export const serverEnv = getServerEnv()
