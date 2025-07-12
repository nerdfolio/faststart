import { LoginCard } from "@nerdfolio/solid-better-auth"
import { GuestListForm } from "@nerdfolio/solid-better-auth/forms"
import { createFileRoute } from "@tanstack/solid-router"

export const Route = createFileRoute("/_public/login")({
	component: Login,
})

function Login() {
	return (
		<LoginCard>
			<GuestListForm />
		</LoginCard>
	)
}
