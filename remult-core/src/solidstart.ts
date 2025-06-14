import { remultAdapter } from "@nerdfolio/remult-better-auth"
import { type BetterAuthOptions, betterAuth } from "better-auth"
import type { Remult } from "remult"
import { createD1DataProvider } from "remult-d1/remult-d1"
import { remultApi } from "remult/remult-solid-start"
import * as authEntities from "../models/auth-models"
import { coreBetterAuthConfig } from "./better-auth/config"

export function initRemultApiWithD1(d1: D1Database, opts: Omit<Parameters<typeof remultApi>[0], "dataProvider">) {
	"user server"

	return remultApi({
		...opts,
		dataProvider: createD1DataProvider(d1),
	})
}

export function initRemultApiWithJsonDb(opts: Omit<Parameters<typeof remultApi>[0], "dataProvider">) {
	"user server"

	return remultApi(opts)
}

export function initBetterAuth(remult: Remult, opts: Omit<BetterAuthOptions, "database">) {
	"user server"

	return betterAuth({
		...coreBetterAuthConfig,
		...opts,
		database: remultAdapter(remult, {
			authEntities,
		}),
	})
}
