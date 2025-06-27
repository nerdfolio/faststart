import { LoginCard } from "ui-better-auth/solidstart"
import { AppBranding } from "~/components/app-branding"
import { authClient } from "~/lib/clients"

export default function LoginPage() {
	return (
		<div class="flex min-h-[75svh] flex-col items-center justify-center">
			<div class="flex w-full max-w-sm flex-col gap-6">
				<AppBranding class="text-muted-foreground" />
				<LoginCard authClient={authClient} successUrl="/dashboard" guestList />
			</div>
		</div>
	)
}
