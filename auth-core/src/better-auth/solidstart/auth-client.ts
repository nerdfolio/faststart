import type { createAuthClient } from "better-auth/solid"

export function makeSessionAccessors(authClient: ReturnType<typeof createAuthClient>) {
	return {
		authUser: () => authClient.useSession()().data?.user,
	}
}

export type SessionResponseType<T extends ReturnType<typeof createAuthClient>> = T["$Infer"]["Session"]
export type AuthSessionType<T extends ReturnType<typeof createAuthClient>> = T["$Infer"]["Session"]["session"]
export type AuthUserType<T extends ReturnType<typeof createAuthClient>> = T["$Infer"]["Session"]["user"]