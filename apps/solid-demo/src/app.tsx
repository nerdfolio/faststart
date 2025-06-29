import { Meta, MetaProvider, Title } from "@solidjs/meta"
import { Router } from "@solidjs/router"
import { FileRoutes } from "@solidjs/start/router"
import { Suspense } from "solid-js"
import "./app.css"
import type { User } from "better-auth"
import { baToRemultUser } from "core/utils/remult-ba"
import { BetterAuthProvider } from "ui-better-auth/solidstart"
import { appVersion } from "./components/app-branding"
import { authClient, remultClient } from "./lib/clients"

export default function App() {
	const onAuthenticated = (u: User) => {
		console.log("onAuthenticated. Setting remult user", u)
		remultClient.user = baToRemultUser(u)
	}

	const onSignout = () => {
		console.log("onSignout. Clearing remult user")
		remultClient.user = undefined
	}

	return (
		<Router
			root={(props) => (
				<MetaProvider>
					<Title>SolidStart - with Vitest</Title>
					<Meta name="appVersion" content={appVersion} />
					<Suspense>
						<BetterAuthProvider authClient={authClient} onAuthenticated={onAuthenticated} onSignout={onSignout}>
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
