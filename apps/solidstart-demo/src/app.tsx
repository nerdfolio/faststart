import { Meta, MetaProvider, Title } from "@solidjs/meta"
import { Router, useLocation, useNavigate } from "@solidjs/router"
import { FileRoutes } from "@solidjs/start/router"
import { type ParentProps, Suspense } from "solid-js"
import "./app.css"
import { BetterAuthProvider } from "@nerdfolio/solid-better-auth"
import { SolidStartUiProvider } from "ui-solid/solidstart"
import type { User } from "better-auth"
import { baUserToRemultUser } from "core/utils/remult-ba"
import { authClient, remultClient } from "./lib/clients"

function syncRemultUser(u: User | undefined) {
	if (u) {
		remultClient.user = baUserToRemultUser(u)
	} else {
		remultClient.user = undefined
	}
}

export default function App() {
	return (
		<Router
			root={(props) => (
				<MetaProvider>
					<Title>SolidStart - with Vitest</Title>
					<Meta name="appVersion" content={__APP_VERSION__} />
					<Suspense>
						<AppContent>{props.children}</AppContent>
					</Suspense>
				</MetaProvider>
			)}
		>
			<FileRoutes />
		</Router>
	)
}

function AppContent(props: ParentProps) {
	const navigate = useNavigate()

	return (
		<SolidStartUiProvider>
			<BetterAuthProvider
				authClient={authClient}
				onAuthChange={syncRemultUser}
				loginUrl="/login"
				loginSuccessUrl={useLocation().pathname}
				navigateTo={navigate}
			>
				{props.children}
			</BetterAuthProvider>
		</SolidStartUiProvider>
	)
}
