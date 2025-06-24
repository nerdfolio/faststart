import { type Database, initAuthApi, withDatabase } from "local-script"
import { scaffoldTestUsers } from "../database/scaffolding/users"

//
// https://orm.drizzle.team/docs/seed-overview
export default async function dbSeed(args: string[]) {
	const dbTarget = args.includes("--remote") ? "remote" : "local"
	withDatabase(dbTarget, async function seedDb(db: Database) {
		const authApi = initAuthApi(db)
		const users = await scaffoldTestUsers(db, authApi)
		for (const u of users) {
			console.log("Completed user:", u)
		}
	})
}
