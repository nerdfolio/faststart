import { remultAdapter } from "@nerdfolio/remult-better-auth"
import { type BetterAuthOptions, betterAuth } from "better-auth"
import { remultApi as initRemultApi } from "remult/remult-solid-start"
import { coreBetterAuthConfig } from "./better-auth/config"

export async function initJsonDbCore({
	remultOpts,
	betterAuthOpts,
}: {
	remultOpts: Omit<Parameters<typeof initRemultApi>[0], "dataProvider">
	betterAuthOpts?: Omit<BetterAuthOptions, "database">
}) {
	"use server"

	const remultApi = initRemultApi(remultOpts)

	const auth = betterAuth({
		...coreBetterAuthConfig,
		...betterAuthOpts,
		database: remultAdapter(await remultApi.getRemult(), {
			authEntities: {},
		}),
	})

	return { remultApi, auth }
}
