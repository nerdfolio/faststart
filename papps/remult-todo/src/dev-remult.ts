import { getAuthTables } from "better-auth/db"
import { devCreateD1DataProviderWithLocalBinding } from "cloudflare-helpers/remult/remult-d1-dev-helpers"
import { remultAdapter } from "remult-better-auth/remult"
import { remultApi } from "remult/remult-solid-start"
import { setTimeout } from "timers/promises"

async function dev() {
	await setTimeout(1)

	const api = remultApi({
		//entities: [Task],
		//controllers: [TasksController],
		dataProvider: devCreateD1DataProviderWithLocalBinding("DB"),
	})

	const getAdapter = remultAdapter(api, {
		debugLogs: {
			// If your adapter config allows passing in debug logs, then pass this here.
			isRunningAdapterTests: true, // This is our super secret flag to let us know to only log debug logs if a test fails.
		},
	})

	const adapter = getAdapter({})

	if (adapter.createSchema) {
		await adapter.createSchema(
			{
				tables: getAuthTables({}),
			},
			"file??"
		)
	}

	console.log("DONE")
}

await dev()
process.exit(0)

// type BetterAuthDbSchema = Record<string, {
//     /**
//      * The name of the table in the database
//      */
//     modelName: string;
//     /**
//      * The fields of the table
//      */
//     fields: Record<string, FieldAttribute>;
//     /**
//      * Whether to disable migrations for this table
//      * @default false
//      */
//     disableMigrations?: boolean;
//     /**
//      * The order of the table
//      */
//     order?: number;
// }>;
// declare const getAuthTables: (options: BetterAuthOptions) => BetterAuthDbSchema;
