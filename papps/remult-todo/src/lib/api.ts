import { BetterAuthError } from "better-auth"
import type { UserInfo } from "remult"
import { remultApi as solidStartRemultApi } from "remult/remult-solid-start"
import { Task } from "../shared/Task"
import { TasksController } from "../shared/TasksController"
import { auth } from "./auth"

export const remultApi = solidStartRemultApi({
	entities: [Task],
	controllers: [TasksController],
	admin: true,
	rootPath: import.meta.env.VITE_REMULT_ROOT_PATH,
	logApiEndPoints: true,
	async getUser({ request }) {
		type Session = typeof auth.$Infer.Session
		const s = await auth.api.getSession({ headers: request.headers })

		if (!s) {
			throw new BetterAuthError("getUserInfo: No session found in request.", JSON.stringify(request))
		}

		const { user: { id, name } } = s satisfies Session
		const roles = "role" in s.user ? (s.user.role as string).split(",").map((r) => r.trim()) : ([] satisfies string[])

		return { id, name, roles } satisfies UserInfo
	},
})
