import { getServerEnv } from "cloudflare-helpers/solidstart/env"
import { createD1DataProvider } from "remult-d1/remult-d1"
import { remultApi } from "remult/remult-solid-start"
import { getUser } from "./auth"
import { Task } from "./shared/Task"
import { TasksController } from "./shared/TasksController"

export const api = remultApi({
	entities: [Task],
	controllers: [TasksController],
	getUser,
	dataProvider: initD1Provider(),
	admin: true,
})

function initD1Provider() {
	const env = getServerEnv()
	console.log("serverEnv....", getServerEnv())
	return createD1DataProvider(env.DB)
}

// async function localD1() {
// 	return getPlatformProxy().then(({ env }) => createD1DataProvider(env.DB))
// }
//
// async function httpD1() {
// 	return devCreateD1DataProviderWithCredentials({
// 		accountId: process.env.CLOUDFLARE_ACCOUNT_ID ?? "",
// 		apiToken: process.env.CLOUDFLARE_D1_TOKEN ?? "",
// 		bindingName: "DB",
// 	})
// }
