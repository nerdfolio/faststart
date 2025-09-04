// src/routes/__root.tsx
/// <reference types="vite/client" />

import { BetterAuthProvider } from "@nerdfolio/solid-better-auth"
import { IconSolidjs } from "ui-solid/icons"
import { TanStartUiProvider } from
"ui-solid
import { ColorModeProvider } from
"ui-solid

import {
	createRootRoute,
	ErrorComponent,
	Navigate,
	Outlet,
	useLocation,
	useNavigate,
} from "@tanstack/solid-router"
import { TanStackRouterDevtools } from "@tanstack/solid-router-devtools"
import { companyName } from "~/company-info"
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
	errorComponent: ErrorComponent,
})

function RootComponent() {
	return <RootLayout />
}

function RootLayout() {
	const navigate = useNavigate()
	const currentPathname = useLocation({ select: (location) => location.pathname })

	return (
		<TanStartUiProvider brandIcon={<IconSolidjs class="size-full text-blue-500" />} brandName={companyName}>
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
