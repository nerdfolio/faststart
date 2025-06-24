//
// https://orm.drizzle.team/docs/seed-overview
//

import type { CliParams } from "local-script"

export default async function dbReset({ args, options }: CliParams) {
	console.log("args", args)
	console.log("options", options)
	// const dbTarget = args.includes("--remote") ? "remote" : "local"
	// withDatabase(dbTarget, async (db) => {
	// 	await reset(db, fullSchema)
	// })
}