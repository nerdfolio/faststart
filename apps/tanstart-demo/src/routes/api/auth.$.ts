import { createServerFileRoute } from "@tanstack/solid-start/server"
import { auth } from "~/lib/auth" // import your auth instance

export const ServerRoute = createServerFileRoute("/api/auth/$").methods({
	GET: ({ request }) => {
		return auth.handler(request)
	},
	POST: ({ request }) => {
		return auth.handler(request)
	},
})
