import Cloudflare from "cloudflare"
import { type SqlCommand, SqlDatabase, type SqlResult } from "remult"
import { SqliteCoreDataProvider } from "remult/remult-sqlite-core-js"

export function createD1HttpDataProvider({
	accountId,
	databaseId,
	apiToken,
}: { accountId: string; databaseId: string; apiToken: string }) {
	return new SqlDatabase(new D1HttpDataProvider(new D1HttpClient({ accountId, databaseId, apiToken })))
}

export class D1HttpDataProvider extends SqliteCoreDataProvider {
	constructor(private d1Client: D1HttpClient) {
		super(
			() => new D1HttpCommand(this.d1Client),
			async () => { },
			false
		)
	}
}

export class D1HttpClient {
	#d1: Cloudflare["d1"]["database"]
	#accountId: string
	#databaseId: string

	constructor({ accountId, databaseId, apiToken }: { accountId: string; databaseId: string; apiToken: string }) {
		this.#d1 = new Cloudflare({ apiToken }).d1.database
		this.#accountId = accountId
		this.#databaseId = databaseId
	}

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	async execute(sql: string, params?: any[]) {
		const {
			result: [page],
		} = await this.#d1.query(this.#databaseId, { sql, params, account_id: this.#accountId })

		// NOTE: d1 query endpoint returns the result as array of object with keys as column names.
		// We're returning that now because the rest of remult seems to expect that.
		// D1 also has a more efficient raw() endpoint that returns {columns: string[], rows: any[][]} that we may want
		// to use eventually, and write code like fromRowToSql()
		// at https://github.com/tursodatabase/libsql-client-ts/blob/main/packages/libsql-client/src/sqlite3.ts#L398
		// to adapt the data
		return page.results as Array<Record<string, unknown>>
	}
}

class D1HttpCommand implements SqlCommand {
	values: any = {}
	i = 1
	constructor(private d1Client: D1HttpClient) { }
	async execute(sql: string): Promise<SqlResult> {
		// as of June 2025: https://developers.cloudflare.com/d1/worker-api/prepared-statements/ says
		// d1 currently does not support named parameters, so we need to convert to positional
		const params = Object.entries(this.values)
			.toSorted(([k1, _v1], [k2, _v2]) => Number.parseInt(k1) - Number.parseInt(k2))
			.map(([_k, v]) => v)

		return new D1SqlResult(await this.d1Client.execute(sql, params))
	}

	addParameterAndReturnSqlToken(val: unknown) {
		return this.param(val)
	}

	param(val: unknown): string {
		if (val instanceof Date) val = val.valueOf()
		if (typeof val === "boolean") val = val ? 1 : 0
		const key = `:${this.i++}`
		this.values[key.substring(1)] = val
		return key
	}
}
class D1SqlResult implements SqlResult {
	columns: string[]

	constructor(public rows: Array<Record<string, unknown>> = []) {
		// NOTE: are we guaranteed that when this is reached, rows is not empty?
		this.columns = rows.length === 0 ? [] : Object.keys(rows[0])
	}

	getColumnKeyInResultForIndexInSelect(index: number): string {
		return this.columns[index]
	}
}
