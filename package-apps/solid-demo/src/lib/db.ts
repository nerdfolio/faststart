import { initDb } from "database"
import { serverEnv } from "./env"

export const db = initDb(serverEnv.DB)
export { fullSchema, authSchema, mainSchema } from "database"
