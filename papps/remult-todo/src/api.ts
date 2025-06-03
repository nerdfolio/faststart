import { createD1DataProvider } from "remult-d1/remult-d1"
import { remultApi } from "remult/remult-solid-start"
import { getPlatformProxy } from "wrangler"
import { getUser } from "./auth"
import { Task } from "./shared/Task"
import { TasksController } from "./shared/TasksController"

//console.log("process.env", process.env.CLOUDFLARE_ACCOUNT_ID)

export const api = remultApi({
	entities: [Task],
	controllers: [TasksController],
	getUser,
	// dataProvider: devCreateD1DataProviderWithCredentials({
	// 	accountId: process.env.CLOUDFLARE_ACCOUNT_ID ?? "",
	// 	apiToken: process.env.CLOUDFLARE_D1_TOKEN ?? "",
	// 	bindingName: "DB",
	// }),
	// dataProvider: new SqlDatabase(new BetterSqlite3DataProvider(new Database("./db/testdb.sqlite"))),
	dataProvider: getPlatformProxy().then(({ env }) => createD1DataProvider(env.DB)),
	admin: true,
})
