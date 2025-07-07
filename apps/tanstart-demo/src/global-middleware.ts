import { registerGlobalMiddleware } from "@tanstack/solid-start"
import { cloudflareEnvMiddleware } from "./middleware/cloudflare-middleware"

registerGlobalMiddleware({
  middleware: [cloudflareEnvMiddleware]
})