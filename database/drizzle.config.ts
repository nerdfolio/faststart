import { D1Helper } from "@nerdfolio/drizzle-d1-helpers"
import { defineConfig } from "drizzle-kit"


export default defineConfig({
	out: "./migrations",
	schema: "./schema",
	dialect: "sqlite",
	...getEnvConfig(),
})

function getEnvConfig() {
	const d1Helper = D1Helper.get()

	// biome-ignore lint/nursery/noProcessEnv: <explanation>
	if (process.env.NODE_ENV === "production") {
		return {
			driver: "d1-http",
			// biome-ignore lint/nursery/noProcessEnv: <explanation>
			dbCredentials: d1Helper.withCfCredentials(process.env.CLOUDFLARE_ACCOUNT_ID, process.env.CLOUDFLARE_D1_TOKEN).proxyCredentials,
		}
	}

	// else dev/local
	return {
		dbCredentials: d1Helper.sqliteLocalFileCredentials,
	}
}
