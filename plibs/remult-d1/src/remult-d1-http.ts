import type { Client, ResultSet } from "@libsql/client"
import type Cloudflare from "cloudflare"
import type { SqlCommand, SqlImplementation, SqlResult } from "remult"
import { SqliteCoreDataProvider } from "remult/remult-sqlite-core-js"
import { cast } from "./isOfType.js"

export class D1HttpDataProvider extends SqliteCoreDataProvider {
	constructor(private cloudflare: Cloudflare) {
		super(
			() => new D1HttpCommand(cloudflare.d1.database, "ACCOUNT_ID", "DATABASE_ID"),
			async () => { },
			false
		)
	}
	async transaction(action: (sql: SqlImplementation) => Promise<void>): Promise<void> {
		const trans = await cast<Client>(this.cloudflare, "transaction").transaction()
		try {
			await action(new D1HttpDataProvider(trans))
			await trans.commit()
		} catch (err) {
			await trans.rollback()
			throw err
		}
	}
}
class D1HttpCommand implements SqlCommand {
	values: any = {}
	i = 1
	constructor(private d1Client: Cloudflare["d1"]["database"], accountId: string, databaseId: string) { }
	async execute(sql: string): Promise<SqlResult> {
		return new D1SqlResult(
			await this.d1Client.raw(databaseId, { account_id: accountId, sql, params: this.values })
			// await this.db.execute({
			// 	sql,
			// 	args: this.values,
			// })
		)
	}
	addParameterAndReturnSqlToken(val: any) {
		return this.param(val)
	}
	param(val: any): string {
		if (val instanceof Date) val = val.valueOf()
		if (typeof val === "boolean") val = val ? 1 : 0
		const key = ":" + this.i++
		this.values[key.substring(1)] = val
		return key
	}
}
class D1SqlResult implements SqlResult {
	constructor(private result: ResultSet) {
		this.rows = result.rows
	}
	rows: any[]
	getColumnKeyInResultForIndexInSelect(index: number): string {
		return this.result.columns[index]
	}
}
