import { createD1DataProvider } from "remult-d1/remult-d1"
import { createD1DataProviderWithCredentials } from "remult-d1/remult-d1-http"

/*
 * The primary use case of d1-http is for local development or for scripts called locally.
 * For those cases, it's annoying to have to worry about copying the correct databaseId (uuid) from wrangler config.
 * This function is a dev-mode helper that uses wrangler to parse its config file and give us the databaseId from
 * the much simpler binding name. This function also simplifies account_id in a similar way
 */
export async function devCreateD1DataProviderWithCredentials({ accountId, apiToken, databaseId, bindingName }: { accountId?: string, apiToken: string, databaseId?: string, bindingName?: string }) {
	if (accountId && databaseId) {
		return createD1DataProviderWithCredentials({ accountId, apiToken, databaseId })
	}

	if (!databaseId && !bindingName) {
		throw new Error("Either databaseId or bindingName must be provided")
	}

	const { unstable_readConfig } = await import("wrangler")
	const { account_id, d1_databases } = unstable_readConfig({})

	const account = accountId ?? account_id ?? process.env.CLOUDFLARE_ACCOUNT_ID
	if (!account) {
		throw new Error("accountId not specified in wrangler config or in CLOUDFLARE_ACCOUNT_ID env. Please specify it explicitly")
	}

	const db = d1_databases.find((d) => d.binding === bindingName)?.database_id
	if (!db) {
		throw new Error(`Could not find database_id for d1 binding ${bindingName}. Please check wrangler config file`)
	}

	return createD1DataProviderWithCredentials({ accountId: account, apiToken, databaseId: db ?? "" })
}

export async function devCreateD1DataProviderWithLocalBinding<Env>(bindingName: keyof Env) {
	return import("wrangler").then(({ getPlatformProxy }) => getPlatformProxy<Env>()
		.then(({ env }) => createD1DataProvider(env[bindingName] as D1Database)))
}