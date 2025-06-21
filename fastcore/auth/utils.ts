import { BetterAuthError } from "better-auth"
import type { initBetterAuth } from "./config"

type BetterAuthService = ReturnType<typeof initBetterAuth>
export function makeGetRequestUser<U, BAS extends BetterAuthService = BetterAuthService>(
	auth: BAS,
	{ transformUser }: { transformUser?: (user: (typeof auth.$Infer.Session)["user"] & { role?: string }) => U }
) {
	return async function getRequestUser({ request }: { request: Request }) {
		const s = await auth.api.getSession({ headers: request.headers })

		if (!s) {
			throw new BetterAuthError("getRequestUser: No session found in request.", JSON.stringify(request))
		}

		return transformUser ? transformUser(s.user) : s.user
	}
}
