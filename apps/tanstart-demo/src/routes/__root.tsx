// src/routes/__root.tsx
/// <reference types="vite/client" />

import { BetterAuthProvider } from "@nerdfolio/solid-better-auth"
import { IconSolidjs } from "@nerdfolio/ui-base-solid/icons"
import { TanStartUiProvider } from "@nerdfolio/ui-base-solid/tanstart"
import { ColorModeProvider } from "@nerdfolio/ui-base-solid/theming"
import { Logo } from "@nerdfolio/ui-base-solid/ui"
import { createRootRoute, Navigate, Outlet, useLocation, useNavigate } from "@tanstack/solid-router"
import { TanStackRouterDevtools } from "@tanstack/solid-router-devtools"
import type { ComponentProps } from "solid-js"
import { appName } from "~/app-info"
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
	notFoundComponent: () => <Navigate to="/404" />,
})

function RootComponent() {
	return <RootLayout />
}

function RootLayout() {
	const navigate = useNavigate()
	const currentPathname = useLocation({ select: (location) => location.pathname })

	function AppBranding() {
		return <Logo withName={appName} withIcon={IconSolidjs} />
	}

	return (
		<TanStartUiProvider Logo={AppBranding}>
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
		</TanStartUiProvider>
	)
}
