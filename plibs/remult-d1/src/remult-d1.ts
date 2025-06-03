import Cloudflare from "cloudflare"
import type { SqlCommand, SqlResult } from "remult"
import { SqliteCoreDataProvider } from "remult/remult-sqlite-core-js"

export class D1DataProvider extends SqliteCoreDataProvider {
	constructor(private d1: D1Client) {
		super(
			() => new D1Command(this.d1),
			async () => {
				// afaik, d1 connection doesn't need closing,
				// so this is just a noop
			},
		)
	}
}

type RowObject = Record<string, unknown>
interface D1Client {
	execute(sql: string, params?: unknown[]): Promise<RowObject[]>
}

export class D1BindingClient implements D1Client {
	/**
	* Simple d1 client that wraps the d1 binding directly
	*
	* const d1 = new D1BindingClient(env.DB)
	*/
	constructor(private d1: D1Database) { }

	async execute(sql: string, params?: unknown[]) {
		// https://developers.cloudflare.com/d1/worker-api/d1-database/
		// https://developers.cloudflare.com/d1/worker-api/prepared-statements/
		//
		// Note: see if we should eventually take advantage of the raw() end point too.
		const stmt = this.d1.prepare(sql)
		const { results } = await (params ? stmt.bind(params) : stmt).run()

		return results
	}
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

	constructor({ accountId, databaseId, apiToken }: { accountId: string; databaseId: string; apiToken: string }) {
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
		return page.results as RowObject[]
	}
}


class D1Command implements SqlCommand {

	#d1: D1Client

	// as of June 2025: https://developers.cloudflare.com/d1/worker-api/prepared-statements/ says
	// d1 currently does not support named parameters, so we need params as an array
	#params: unknown[] = []

	constructor(d1: D1Client) {
		this.#d1 = d1
	}

	async execute(sql: string): Promise<SqlResult> {
		return new D1SqlResult(await this.#d1.execute(sql, this.#params))
	}

	/** @deprecated use `param` instead*/
	addParameterAndReturnSqlToken(val: unknown) {
		return this.param(val)
	}

	param(val: unknown): string {
		let p: unknown
		if (val instanceof Date) p = val.valueOf()
		else if (typeof val === "boolean") p = val ? 1 : 0
		else p = val

		this.#params.push(p)

		// return key as 1-based array index prefixed by a colon to be compatible
		// with other remult SqlCommand implementations
		const key = `:${this.#params.length}`
		return key
	}
}

class D1SqlResult implements SqlResult {
	columns: string[]

	constructor(public rows: RowObject[] = []) {
		// NOTE: are we guaranteed that when this is reached, rows is not empty?
		this.columns = rows.length === 0 ? [] : Object.keys(rows[0])
	}

	getColumnKeyInResultForIndexInSelect(index: number): string {
		return this.columns[index]
	}
}
