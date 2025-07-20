// src/routes/__root.tsx
/// <reference types="vite/client" />

import { BetterAuthProvider } from "@nerdfolio/solid-better-auth"
import { UiProvider } from "@nerdfolio/ui-base-solid/context"
import { ColorModeProvider, ColorModeScript } from "@nerdfolio/ui-base-solid/theming"
import { wrapLink } from "@nerdfolio/ui-base-solid/utils"
import { createRootRoute, Link, Navigate, Outlet, useLocation, useNavigate } from "@tanstack/solid-router"
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
		scripts: [
			// {
			// 	children: generateInitDarkModeScript(),
			// },
		],
	}),
	component: RootComponent,
	notFoundComponent: () => <Navigate to="/404" />,
})

function RootComponent() {
	return <RootLayout />
}

function RootLayout() {
	const navigate = useNavigate()
	const currentPathname = useLocation({ select: (location) => location.pathname })

	return (
		<UiProvider HrefLink={wrapLink(Link, "to")}>
			<ColorModeProvider storageType="cookie">
				<BetterAuthProvider
					authClient={authClient}
					navigateTo={(to) => navigate({ to, viewTransition: true })}
					onAuthChange={syncRemultUser}
					loginUrl="/login"
					loginSuccessUrl={currentPathname}
				>
					<Outlet />
				</BetterAuthProvider>
			</ColorModeProvider>
			<TanStackRouterDevtools />
		</UiProvider>
	)
}
