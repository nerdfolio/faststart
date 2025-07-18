import { LoginCard } from "@nerdfolio/solid-better-auth"
import { EmailPasswordForm, GuestListForm, MagicLinkForm } from "@nerdfolio/solid-better-auth/forms"
import { createFileRoute, Link } from "@tanstack/solid-router"
import { AppBranding } from "~/components/app-branding"

export const Route = createFileRoute("/_public/login")({
	component: Login,
})

function Login() {
	const footer = (
		<div>
			By continuing, you agree to our <Link to="/terms">Terms of Service</Link> and&nbsp;
			<Link to="/privacy">Privacy Policy</Link>.
		</div>
	)

	return (
		<div class="flex min-h-[75svh] flex-col items-center justify-center">
			<div class="flex w-full max-w-sm flex-col gap-6">
				<AppBranding class="text-muted-foreground" />
				<LoginCard footer={footer}>
					<GuestListForm />
					<MagicLinkForm />
				</LoginCard>
			</div>
		</div>
	)
}
