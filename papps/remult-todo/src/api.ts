import { devCreateD1DataProviderWithCredentials } from "remult-d1/remult-d1-http"
import { remultApi } from "remult/remult-solid-start"
import { getUser } from "./auth"
import { Task } from "./shared/Task"
import { TasksController } from "./shared/TasksController"

//console.log("process.env", process.env.CLOUDFLARE_ACCOUNT_ID)

export const api = remultApi({
	entities: [Task],
	controllers: [TasksController],
	getUser,
	dataProvider: devCreateD1DataProviderWithCredentials({
		accountId: process.env.CLOUDFLARE_ACCOUNT_ID ?? "",
		apiToken: process.env.CLOUDFLARE_D1_TOKEN ?? "",
		//databaseId: "af1e900f-06b9-4d71-9ed7-78639cd7dc79",
		bindingName: "DB",
	}),
	// dataProvider: new SqlDatabase(new BetterSqlite3DataProvider(new Database("./db/testdb.sqlite"))),
	admin: true,
})
