import { type ComponentProps, For } from "solid-js"
import { LoginCard } from "ui-better-auth/solidstart"
import { AppBranding } from "~/components/app-branding"
import { authClient } from "~/lib/clients"

export default function LoginPage() {
	return (
		<div class="flex min-h-[75svh] flex-col items-center justify-center">
			<div class="flex w-full max-w-sm flex-col gap-6">
				<AppBranding class="text-muted-foreground" />
				<LoginCard authClient={authClient} callbackUrl="/dashboard" />
				<DemoCredentials class="self-center text-muted-foreground text-sm mt-4" />
			</div>
		</div>
	)
}

function DemoCredentials(props: ComponentProps<"div">) {
	const demoCreds = [
		{ email: "alice@example.com", demoPW: "demo-123" },
		{ email: "bob@example.com", demoPW: "demo-123" },
	]

	return (
		<div class={props.class}>
			<p>Demo Credentials:</p>
			<For each={demoCreds}>
				{({ email, demoPW }) => (
					<p>
						{email} / {demoPW}
					</p>
				)}
			</For>
		</div>
	)
}
