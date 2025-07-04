// src/routes/__root.tsx
import { createRootRoute, Outlet } from "@tanstack/solid-router"

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
	}),
	component: RootComponent,
})

function RootComponent() {
	return <Outlet />
}
