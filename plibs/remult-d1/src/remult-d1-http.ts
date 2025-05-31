import Cloudflare from "cloudflare"
import type { DatabaseRawResponse } from "cloudflare/resources/d1.mjs"
import type { SqlCommand, SqlResult } from "remult"
import { SqliteCoreDataProvider } from "remult/remult-sqlite-core-js"

export function createD1HttpDataProvider({ accountId, databaseId, apiToken }: { accountId: string; databaseId: string; apiToken: string }) {
	return new D1HttpDataProvider(new D1HttpClient({ accountId, databaseId, apiToken }))
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
	async execute(sql: string, params?: any) {
		// as of June 2025: https://developers.cloudflare.com/d1/worker-api/prepared-statements/ says
		// d1 currently does not support named parameters, so we need to convert to positional
		const paramArray = Array.isArray(params) ? params : Object.entries(params)
			.toSorted(([k1, _v1], [k2, _v2]) => Number.parseInt(k1) - Number.parseInt(k2))
			.map(([_k, v]) => v)


		const {
			result: [page],
		} = await this.#d1.raw(this.#databaseId, { sql, params: paramArray, account_id: this.#accountId })

		return page.results as DatabaseRawResponse.Results
	}
}

class D1HttpCommand implements SqlCommand {
	values: any = {}
	i = 1
	constructor(private d1Client: D1HttpClient) { }
	async execute(sql: string): Promise<SqlResult> {
		console.log("SQL", sql)
		console.log("VALUES", this.values)
		return new D1SqlResult(await this.d1Client.execute(sql, []))
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
	constructor(private result: DatabaseRawResponse.Results) { }

	get rows() {
		return this.result.rows ?? []
	}
	getColumnKeyInResultForIndexInSelect(index: number): string {
		return this.result.columns?.[index] ?? ""
	}
}
