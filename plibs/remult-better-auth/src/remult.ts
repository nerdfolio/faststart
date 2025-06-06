import { desc, eq, sql } from "drizzle-orm"

import { BetterAuthError, type Where } from "better-auth"
import { type AdapterDebugLogs, createAdapter } from "better-auth/adapters"
import { type ClassType, SqlDatabase, dbNamesOf, repo } from "remult"
import { createSchema } from "./create-schema"
import { convertWhereClause } from "./utils"

export interface RemultAdapterOptions {
	authEntities: Record<string, ClassType<unknown>>
	/**
	 * Enable debug logs for the adapter
	 * @default false
	 */
	debugLogs?: AdapterDebugLogs
}

export function remultAdapter({ authEntities, debugLogs = false }: RemultAdapterOptions) {
	function getEntityClass(modelName: string) {
		// NOTE: should request the entityInfo_key Symbol be exported by remult
		const keySymbol = Symbol.for("entityInfo_key")
		const entityClass = Object.values(authEntities).find((ent) => ent[keySymbol] === modelName)

		if (!entityClass) {
			throw new BetterAuthError(
				`The model "${modelName}" was not found in the authEntities object. Please pass the authEntities directly to the adapter options.`
			)
		}
		return entityClass
	}

	function getRepo(modelName: string) {
		return repo(getEntityClass(modelName))
	}

	return createAdapter({
		config: {
			adapterId: "remult",
			adapterName: "Remult Adapter",
			debugLogs,
		},
		adapter: ({ getFieldName, debugLog }) => {
			return {
				createSchema,
				async create({ model, data: values }) {
					const modelRepo = getRepo(model)
					return modelRepo.create(values)
				},
				async findOne({ model, where }) {
					const modelRepo = getRepo(model)
					return modelRepo.findOne({
						where: convertWhereClause(where),
					})
				},
				async findMany({ model, where, sortBy, limit, offset }) {
					const modelRepo = getRepo(model)
					if (offset) {
						// NOTE: remult repo.find() only accepts limit + page but not offset
						// so we have to do something manual here
						const command = SqlDatabase.getDb().createCommand()
						const [dbTable, filterSql] = await Promise.all([
							dbNamesOf(modelRepo),
							SqlDatabase.filterToRaw(modelRepo, convertWhereClause(where), command),
						])

						const orderBy = sortBy ? `ORDER BY ${sortBy.field} ${sortBy.direction}` : ""
						const limitOffset = `${limit ? `LIMIT ${limit} ` : ""} OFFSET ${offset}`.trim()

						return command.execute(`SELECT * FROM ${dbTable} WHERE ${filterSql} ${orderBy} ${limitOffset}`.trim())
					}

					return modelRepo.find({
						where: where ? convertWhereClause(where) : undefined,
						orderBy: sortBy ? { [sortBy.field]: sortBy.direction } : undefined,
						limit,
					})
				},
				async count({ model, where }) {
					const modelRepo = getRepo(model)
					return modelRepo.count(convertWhereClause(where))
				},
				async update({ model, where, update: values }) {
					const modelRepo = getRepo(model)
					console.log("SINGLE UPDATE", model, where, values)
					return modelRepo.updateMany({
						where: convertWhereClause(where),
						set: values as Record<string, unknown>,
					})

					// const schemaModel = getSchema(model)
					// const clause = convertWhereClause(where, model)
					// const builder = db
					// 	.update(schemaModel)
					// 	.set(values)
					// 	.where(...clause)
					// return await withReturning(model, builder, values as any, where)
				},
				async updateMany({ model, where, update: values }) {
					const modelRepo = getRepo(model)
					return modelRepo.updateMany({
						where: convertWhereClause(where),
						set: values as Record<string, unknown>,
					})
				},
				async delete({ model, where }) {
					// const schemaModel = getSchema(model)
					// const clause = convertWhereClause(where, model)
					// const builder = db.delete(schemaModel).where(...clause)
					// return await builder
				},
				async deleteMany({ model, where }) {
					// const schemaModel = getSchema(model)
					// const clause = convertWhereClause(where, model)
					// const builder = db.delete(schemaModel).where(...clause)
					// return await builder
				},
				options: config,
			}
		},
	})
}

function getSchema(model: string) {
	const schema = config.schema || db._.fullSchema
	if (!schema) {
		throw new BetterAuthError(
			"Drizzle adapter failed to initialize. Schema not found. Please provide a schema object in the adapter options object."
		)
	}
	const schemaModel = schema[model]
	if (!schemaModel) {
		throw new BetterAuthError(
			`[# Drizzle Adapter]: The model "${model}" was not found in the schema object. Please pass the schema directly to the adapter options.`
		)
	}
	return schemaModel
}

function checkMissingFields(schema: Record<string, any>, model: string, values: Record<string, any>) {
	if (!schema) {
		throw new BetterAuthError(
			"Drizzle adapter failed to initialize. Schema not found. Please provide a schema object in the adapter options object."
		)
	}
	for (const key in values) {
		if (!schema[key]) {
			throw new BetterAuthError(
				`The field "${key}" does not exist in the "${model}" schema. Please update your drizzle schema or re-generate using "npx @better-auth/cli generate".`
			)
		}
	}
}

async function withReturning(model: string, builder: any, data: Record<string, any>, where?: Where[]) {
	if (config.provider !== "mysql") {
		const c = await builder.returning()
		return c[0]
	}
	await builder.execute()
	const schemaModel = getSchema(model)
	const builderVal = builder.config?.values

	if (where?.length) {
		const clause = convertWhereClause(where, model)
		const res = await db
			.select()
			.from(schemaModel)
			.where(...clause)
		return res[0]
	}

	if (builderVal?.[0]?.id?.value) {
		let tId = builderVal[0]?.id?.value
		if (!tId) {
			//get last inserted id
			const lastInsertId = await db
				.select({ id: sql`LAST_INSERT_ID()` })
				.from(schemaModel)
				.orderBy(desc(schemaModel.id))
				.limit(1)
			tId = lastInsertId[0].id
		}
		const res = await db.select().from(schemaModel).where(eq(schemaModel.id, tId)).limit(1).execute()
		return res[0]
	}

	if (data.id) {
		const res = await db.select().from(schemaModel).where(eq(schemaModel.id, data.id)).limit(1).execute()
		return res[0]
	}

	// If the user doesn't have `id` as a field, then this will fail.
	// We expect that they defined `id` in all of their models.
	if (!("id" in schemaModel)) {
		throw new BetterAuthError(
			`The model "${model}" does not have an "id" field. Please use the "id" field as your primary key.`
		)
	}
	const res = await db.select().from(schemaModel).orderBy(desc(schemaModel.id)).limit(1).execute()
	return res[0]
}
