import type { BetterAuthClientPlugin } from "better-auth"
import type { guestList } from "."

export const anonymousClient = () => {
	return {
		id: "guest-list",
		$InferServerPlugin: {} as ReturnType<typeof guestList>,
		pathMethods: {
			"/sign-in/guest-list": "POST",
		},
	} satisfies BetterAuthClientPlugin
}
