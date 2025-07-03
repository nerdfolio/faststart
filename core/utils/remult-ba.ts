import { BetterAuthError, type User } from "better-auth"
import type { UserInfo } from "remult"
import type { initBetterAuth } from "../auth/config"

type UserWithRole = User & { role?: string }

export function baUserToRemultUser<BAU extends UserWithRole>({ name, id, role = "" }: BAU) {
	return {
		name,
		id,
		roles: role.split(",").map((r) => r.trim()),
	} as UserInfo
}

export async function getRemultUserFromBetterAuth(serverAuth: ReturnType<typeof initBetterAuth>, request: Request) {
	const s = await serverAuth.api.getSession({ headers: request.headers })

	if (!s) {
		throw new BetterAuthError("getUser: No session found in request.", JSON.stringify(request))
	}

	return baUserToRemultUser(s.user)
}
