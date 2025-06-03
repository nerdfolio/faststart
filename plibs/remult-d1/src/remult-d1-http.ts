import Cloudflare from "cloudflare"
import { SqlDatabase } from "remult"
import { type D1Client, D1DataProvider, type D1RowObject } from "./remult-d1"

type D1Credentials = { accountId: string; apiToken: string; databaseId: string }
export function createD1DataProviderWithCredentials(creds: D1Credentials) {
	return new SqlDatabase(new D1DataProvider(new D1HttpClient(creds)))
}


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


export class D1HttpClient implements D1Client {
	#d1: Cloudflare["d1"]["database"]
	#accountId: string
	#databaseId: string

	constructor({ accountId, databaseId, apiToken }: D1Credentials) {
		this.#d1 = new Cloudflare({ apiToken }).d1.database
		this.#accountId = accountId
		this.#databaseId = databaseId
	}

	async execute(sql: string, params?: unknown[]) {
		return this.#d1.query(this.#databaseId, {
			sql,
			params: params as string[],
			account_id: this.#accountId,
		}).then(({ result: pages }) => pages.flatMap((page) => page.results as D1RowObject[]))

		// NOTE: d1 query endpoint returns the result as array of object with keys as column names.
		// We're returning that now because the rest of remult seems to expect that.
		// D1 also has a more efficient raw() endpoint that returns {columns: string[], rows: any[][]} that we may want
		// to use eventually, and write code like fromRowToSql()
		// at https://github.com/tursodatabase/libsql-client-ts/blob/main/packages/libsql-client/src/sqlite3.ts#L398
		// to adapt the data
	}
}
