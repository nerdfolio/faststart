import { runAdapterTest } from "better-auth/adapters/test"
import { remultAdapter } from "remult-better-auth/remult"
import { afterAll, describe } from "vitest"
describe("remult-better-auth adapter tests", async () => {
	// const remult = await remultApi({
	// 	entities: [Task],
	// 	//controllers: [TasksController],
	// 	//dataProvider: devCreateD1DataProviderWithLocalBinding("DB"),
	// }).getRemult()

	afterAll(async () => {
		// Run DB cleanup here...
	})
	const adapter = remultAdapter({
		authEntities: {},
		debugLogs: {
			// If your adapter config allows passing in debug logs, then pass this here.
			isRunningAdapterTests: true, // This is our super secret flag to let us know to only log debug logs if a test fails.
		},
	})

	await runAdapterTest({
		getAdapter: async (betterAuthOptions = {}) => {
			return adapter(betterAuthOptions)
		},
	})
})
