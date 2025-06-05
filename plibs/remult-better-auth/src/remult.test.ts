import { runAdapterTest } from "better-auth/adapters/test"
import { afterAll, describe } from "vitest"
import { remultAdapter } from "./remult"

describe("My Adapter Tests", async () => {
	afterAll(async () => {
		// Run DB cleanup here...
	})
	const adapter = remultAdapter({
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
