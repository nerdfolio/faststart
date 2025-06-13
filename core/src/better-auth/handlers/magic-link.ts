import type { magicLink } from "better-auth/plugins"

type SendMagicLinkFn = Parameters<typeof magicLink>[0]["sendMagicLink"]
export const logMagicLinkToServerConsole: SendMagicLinkFn = async ({ email, url }, _request) => {
	if (import.meta.env.DEV) {
		console.warn("Logging to console for testing/dev only. Do not use in real project.", email, url)
	} else {
		throw new Error("sendMagicLink not implemented!")
	}
}
