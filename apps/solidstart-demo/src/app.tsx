import { Meta, MetaProvider, Title } from "@solidjs/meta"
import { Router } from "@solidjs/router"
import { FileRoutes } from "@solidjs/start/router"
import { Suspense } from "solid-js"
import "./app.css"
import type { User } from "better-auth"
import { baUserToRemultUser } from "core/utils/remult-ba"
import { BetterAuthProvider } from "ui-better-auth/solidstart"
import { appVersion } from "./app-info"
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
					<Meta name="appVersion" content={appVersion} />
					<Suspense>
						<BetterAuthProvider
							authClient={authClient}
							onAuthChange={syncRemultUser}
							signInRedirect="/dashboard"
							signOutRedirect="/"
						>
							{props.children}
						</BetterAuthProvider>
					</Suspense>
				</MetaProvider>
			)}
		>
			<FileRoutes />
		</Router>
	)
}
