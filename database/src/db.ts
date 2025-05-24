import { type AnyD1Database, drizzle as drizzleD1 } from "drizzle-orm/d1"
import * as authSchema from "../schema/auth-schema"
import * as mainSchema from "../schema/main-schema"

const fullSchema = {
	...authSchema,
	...mainSchema,
}

export { authSchema, mainSchema, fullSchema }

export function initDb(binding: AnyD1Database) {
	return drizzleD1(binding, { schema: fullSchema })
}
