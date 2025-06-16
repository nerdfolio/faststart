import { type UserInfo, repo } from "remult"
import { User } from "remult-core/models/auth-models"
import { initRemultApiWithJsonDb } from "remult-core/solidstart"
import { getSession } from "vinxi/http"
import { Task } from "./shared/Task"
import { TasksController } from "./shared/TasksController"

export const remultApi = initRemultApiWithJsonDb({
	entities: [Task],
	controllers: [TasksController],
	getUser: getUserInfo,
	admin: true,
	rootPath: import.meta.env.VITE_REMULT_ROOT_PATH,
	logApiEndPoints: true,
})

// export const api = await initApi()

// async function initApi() {
// 	const api = initRemultApiWithJsonDb({
// 		entities: [Task],
// 		controllers: [TasksController],
// 		getUser: getUserInfo,
// 		admin: true,
// 		rootPath: import.meta.env.VITE_REMULT_ROOT_PATH,
// 		logApiEndPoints: true,
// 	})

// 	return {
// 		...api,
// 		remult: await api.getRemult().then((r) => {
// 			r.apiClient.url = "/api/r"
// 			return r
// 		}),
// 	} as RemultSolidStartServer & { remult: Remult }
// }

export async function getUserInfo() {
	"user server"

	const session = await getSession<{ userId: string }>({
		// biome-ignore lint/nursery/noProcessEnv: <explanation>
		password: process.env.SESSION_SECRET || "DEV_SESSION_SUPER_DOOPER_MOOPER_SECRETIVE_SECRET",
	})

	const u = await repo(User).findId(session?.data?.userId)

	if (!u) throw new Error(`User not found for session id [${session?.id}] with data [${JSON.stringify(session?.data)}]`)

	console.log("SESSION", session, "USER", u)

	return { id: u.id, name: u.name, roles: [] satisfies string[] } satisfies UserInfo
}
