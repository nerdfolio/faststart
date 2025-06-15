import { type UserInfo, repo } from "remult"
import { User } from "remult-core/models/auth-models"
import { initRemultApiWithJsonDb } from "remult-core/solidstart"
import { getSession } from "vinxi/http"
import { Task } from "./shared/Task"
import { TasksController } from "./shared/TasksController"

export const api = initRemultApiWithJsonDb({
	entities: [Task],
	controllers: [TasksController],
	getUser: getUserOnServer,
	admin: true,
})

export async function getUserOnServer() {
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
