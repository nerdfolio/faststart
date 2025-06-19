"user server"
import { BetterAuthError } from "better-auth"
import type { UserInfo } from "remult"
import { remultApi as solidStartRemultApi } from "remult/remult-solid-start"
import { Account, Session, User, Verification } from "remult-core/models/auth-models"
import { auth } from "./auth"

const authEntities = [User, Session, Account, Verification]
export const remultApi = solidStartRemultApi({
	entities: [...authEntities],
	admin: true,
	rootPath: import.meta.env.VITE_REMULT_ROOT_PATH,
	logApiEndPoints: true,
	// dataProvider: createD1DataProvider(serverEnv.DB),
	async getUser({ request }) {
		type Session = typeof auth.$Infer.Session
		const s = await auth.api.getSession({ headers: request.headers })

		if (!s) {
			throw new BetterAuthError("getUserInfo: No session found in request.", JSON.stringify(request))
		}

		const {
			user: { id, name },
		} = s satisfies Session
		const roles = "role" in s.user ? (s.user.role as string).split(",").map((r) => r.trim()) : ([] satisfies string[])

		return { id, name, roles } satisfies UserInfo
	},
})