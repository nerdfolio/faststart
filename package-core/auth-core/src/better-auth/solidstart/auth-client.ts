import type { createAuthClient } from "better-auth/solid"

export function makeSessionAccessors(authClient: ReturnType<typeof createAuthClient>) {
	return {
		authUser: () => authClient.useSession()().data?.user,
	}
}
