import type { createAuthClient } from "better-auth/solid"

export { toSolidStartHandler } from "better-auth/solid-start"
export * from "./config"

export type SessionResponseType<T extends ReturnType<typeof createAuthClient>> = T["$Infer"]["Session"]
export type AuthSessionType<T extends ReturnType<typeof createAuthClient>> = T["$Infer"]["Session"]["session"]
export type AuthUserType<T extends ReturnType<typeof createAuthClient>> = T["$Infer"]["Session"]["user"]

export function makeSessionAccessors(authClient: ReturnType<typeof createAuthClient>) {
	return {
		authUser: () => authClient.useSession()().data?.user,
	}
}