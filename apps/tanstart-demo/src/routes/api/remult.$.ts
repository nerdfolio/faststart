import { createServerFileRoute } from "@tanstack/solid-start/server"
import { remultApi } from "~/lib/remult-api" // import your auth instance

export const ServerRoute = createServerFileRoute("/api/remult/$").methods(remultApi)
