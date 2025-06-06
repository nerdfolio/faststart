import { setTimeout } from "node:timers/promises"
import { Task } from "./shared/Task"

async function dev() {
	await setTimeout(1)


	console.dir(Task)
	console.log(Object.getOwnPropertySymbols(Task))
	const entityKey = Task[Symbol.for("entityInfo_key")]
	console.log(entityKey, typeof entityKey)

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

await dev()
process.exit(0)
