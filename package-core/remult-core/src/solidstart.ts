import { remultAdapter } from "@nerdfolio/remult-better-auth"
import { type BetterAuthOptions, betterAuth } from "better-auth"
import type { DataProvider, Remult } from "remult"
import * as authEntities from "../models/auth-models"
import { coreBetterAuthConfig } from "./better-auth/config"

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
