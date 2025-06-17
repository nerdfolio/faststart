import type { BetterAuthClientPlugin } from "better-auth"
import type { guest } from "."

export const anonymousClient = () => {
	return {
		id: "guest",
		$InferServerPlugin: {} as ReturnType<typeof guest>,
		pathMethods: {
			"/sign-in/anonymous": "POST",
		},
	} satisfies BetterAuthClientPlugin
}
