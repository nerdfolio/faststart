import { createMiddleware } from "@solidjs/start/middleware"
import { injectServerEnvMiddleware } from "cloudflare-helpers/solidstart/env"
export default createMiddleware({
	onRequest: injectServerEnvMiddleware,
})
