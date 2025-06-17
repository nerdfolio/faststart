import { remultAdapter } from "@nerdfolio/remult-better-auth"
import { type BetterAuthOptions, betterAuth } from "better-auth"
import type { DataProvider, Remult } from "remult"
import * as authEntities from "../models/auth-models"
import { coreBetterAuthConfig } from "./better-auth/config"

// export function initRemult(d1: D1Database) {
// 	return createD1DataProvider(d1)
// }

// export function initRemultApiWithD1(d1: D1Database, opts: Omit<Parameters<typeof remultApi>[0], "dataProvider">) {
// 	"user server"

// 	return remultApi({ ...opts, dataProvider: createD1DataProvider(d1) })
// }

// export function initRemultApiWithJsonDb(opts: Omit<Parameters<typeof remultApi>[0], "dataProvider">) {
// 	"user server"

// 	console.log("initRemultApiWithJsonDb", opts)

// 	return remultApi(opts)
// }

export function initBetterAuth(remultDataProvider: DataProvider | Remult, opts: Omit<BetterAuthOptions, "database"> = {}) {
	"user server"

	const plugins = [...coreBetterAuthConfig.plugins ?? [], ...opts.plugins ?? []]
	return betterAuth({
		...coreBetterAuthConfig,
		...opts,
		plugins,
		database: remultAdapter(remultDataProvider, { authEntities })
	})
}
