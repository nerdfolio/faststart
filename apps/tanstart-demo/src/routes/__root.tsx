// src/routes/__root.tsx
/// <referece types="vite/client" />
import { createRootRoute, Outlet } from "@tanstack/solid-router"

import appCss from "../app.css?url"

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charset: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "TanStack Start Starter",
			},
		],
		links: [{ rel: "stylesheet", href: appCss }],
	}),
	component: RootComponent,
})

function RootComponent() {
	return <Outlet />
}
