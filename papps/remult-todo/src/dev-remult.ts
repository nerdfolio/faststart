import { setTimeout } from "node:timers/promises"
import { remultAdapter } from "remult-better-auth/remult"

async function dev() {
	await setTimeout(1)

	// const api = remultApi({
	// 	//entities: [Task],
	// 	//controllers: [TasksController],
	// 	dataProvider: devCreateD1DataProviderWithLocalBinding("DB"),
	// })

	// const getAdapter = remultAdapter({
	// 	authEntities: api.entities,
	// 	debugLogs: {
	// 		// If your adapter config allows passing in debug logs, then pass this here.
	// 		isRunningAdapterTests: true, // This is our super secret flag to let us know to only log debug logs if a test fails.
	// 	},
	// })

	// const adapter = getAdapter({})

	// if (adapter.createSchema) {
	// 	await adapter.createSchema(
	// 		{
	// 			tables: getAuthTables({}),
	// 		},
	// 		"file??"
	// 	)
	// }

	// console.log("DONE")
}

async function generateSchema() {
	await setTimeout(1)

	const adapter = remultAdapter({
		authEntities: {},
		debugLogs: {
			// If your adapter config allows passing in debug logs, then pass this here.
			isRunningAdapterTests: true, // This is our super secret flag to let us know to only log debug logs if a test fails.
		},
	})

	const { createSchema } = adapter({})

	if (createSchema) {
		await createSchema({})
	}
}

await generateSchema()
process.exit(0)
