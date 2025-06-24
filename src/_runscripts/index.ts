import { confirm } from "@inquirer/prompts"
import { type BoundD1, D1Helper, type ProxyD1 } from "@nerdfolio/drizzle-d1-helpers"

export type { CliParams } from "./common"

export type Database = BoundD1 | ProxyD1
export async function withDatabase(dbEnv: "local" | "remote", doWerk: (db: Database) => Promise<void>) {
	if (dbEnv === "remote") {
		const answer = await confirm({
			message: "*** Acquiring a handle to the PRODUCTION DATABASE. Are you sure?",
			default: false,
		})

		if (answer) {
			// biome-ignore lint/nursery/noProcessEnv: <explanation>
			D1Helper.get().withCfCredentials(process.env.CLOUDFLARE_ACCOUNT_ID, process.env.CLOUDFLARE_D1_TOKEN).useProxyD1(doWerk)
		} else {
			console.log("Aborting...")
			process.exit(0)
		}
	} else {
		D1Helper.get().useLocalD1(doWerk)
	}
}

export type AuthApi = ReturnType<typeof initAuthApi>
export function initAuthApi(db: Database) {
	return initServerAuth(db, {
		emailAndPassword: {
			enabled: true,
			requireEmailVerification: false,
			autoSignIn: false,
		},
	}).api
}
