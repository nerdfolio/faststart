import { remultAdapter } from "@nerdfolio/remult-better-auth"
import { type BetterAuthOptions, betterAuth } from "better-auth"
import { createD1DataProvider as remultD1DataProvider } from "remult-d1/remult-d1"
import { remultApi as initRemultApi } from "remult/remult-solid-start"
import { coreBetterAuthConfig } from "./better-auth/settings"

export async function initSolidStartCore({
	d1,
	remultOpts,
	betterAuthOpts,
}: {
	d1: D1Database
	remultOpts: Omit<Parameters<typeof initRemultApi>[0], "dataProvider">
	betterAuthOpts?: Omit<BetterAuthOptions, "database">
}) {
	"use server"

	const remultApi = initRemultApi({
		...remultOpts,
		dataProvider: remultD1DataProvider(d1),
	})

	const auth = betterAuth({
		...coreBetterAuthConfig,
		...betterAuthOpts,
		database: remultAdapter(await remultApi.getRemult(), {
			authEntities: {},
		}),
	})

	return { remultApi, auth }
}
