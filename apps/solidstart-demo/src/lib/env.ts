"use server"
import { getServerEnv } from "cloudflare-utils/solidstart"

export const serverEnv = getServerEnv()
