// src/routes/__root.tsx
/// <reference types="vite/client" />

import { BetterAuthProvider } from "@nerdfolio/ui-better-auth/tanstart"
import { createRootRoute, Outlet, useLocation, useNavigate } from "@tanstack/solid-router"
import { TanStackRouterDevtools } from "@tanstack/solid-router-devtools"
import { authClient, syncRemultUser } from "~/lib/clients"
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
	return <RootLayout />
}

function RootLayout() {
	const navigate = useNavigate()
	const currentPathname = useLocation({ select: (location) => location.pathname })

	return (
		<>
			<BetterAuthProvider
				authClient={authClient}
				navigateTo={(to) => navigate({ to, viewTransition: true })}
				onAuthChange={syncRemultUser}
				logInUrl="/login"
				logInSuccessUrl={currentPathname}
			>
				<div>zzzzz</div>
				<Outlet />
			</BetterAuthProvider>
			<TanStackRouterDevtools />
		</>
	)
}
