import { createMiddleware } from "@solidjs/start/middleware"
import { injectServerEnvMiddleware } from "cloudflare-context/solidstart/env"
export default createMiddleware({
	onRequest: injectServerEnvMiddleware,
})
