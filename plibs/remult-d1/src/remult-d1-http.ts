import Cloudflare from "cloudflare"
import { SqlDatabase } from "remult"
import { type D1Client, D1DataProvider, type D1RowObject } from "./remult-d1"

type D1Credentials = { accountId: string; databaseId: string; apiToken: string }
export function createD1DataProviderWithCredentials(creds: D1Credentials) {
	return new SqlDatabase(new D1DataProvider(new D1HttpClient(creds)))
}

export class D1HttpClient implements D1Client {
	/*
	 * Simple d1 client that internally uses a cloudflare sdk client along with
	 * d1 credentials to access D1 remotely
	 *
	 * const d1 = new D1HttpClient({
	 * 	accountId: process.env.CLOUDFLARE_ACCOUNT_ID,
	 * 	apiToken: process.env.CLOUDFLARE_D1_TOKEN,
	 *   databaseId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
	 * })
	 *
	 */

	#d1: Cloudflare["d1"]["database"]
	#accountId: string
	#databaseId: string

	constructor({ accountId, databaseId, apiToken }: D1Credentials) {
		this.#d1 = new Cloudflare({ apiToken }).d1.database
		this.#accountId = accountId
		this.#databaseId = databaseId
	}

	async execute(sql: string, params?: unknown[]) {
		const {
			// TODO: d1Http has pagination supports.
			// need to figure out how remult handles pagination .. should we pull all pages here?
			result: [page],
		} = await this.#d1.query(this.#databaseId, { sql, params: params as string[], account_id: this.#accountId })

		// NOTE: d1 query endpoint returns the result as array of object with keys as column names.
		// We're returning that now because the rest of remult seems to expect that.
		// D1 also has a more efficient raw() endpoint that returns {columns: string[], rows: any[][]} that we may want
		// to use eventually, and write code like fromRowToSql()
		// at https://github.com/tursodatabase/libsql-client-ts/blob/main/packages/libsql-client/src/sqlite3.ts#L398
		// to adapt the data
		return page.results as D1RowObject[]
	}
}
