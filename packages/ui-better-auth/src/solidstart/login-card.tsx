import { Card, CardContent, CardHeader, CardTitle } from "@nerdfolio/ui-base-solid/ui"
import { cn } from "@nerdfolio/ui-base-solid/utils"
import { A, useNavigate } from "@solidjs/router"
import { type ComponentProps, createSignal, Show, splitProps } from "solid-js"
import { useBetterAuth } from "../solid/context"
import EmailPasswordForm from "./forms/emailpassword-form"
import GuestListForm from "./forms/guestlist-form"
import MagicLinkForm from "./forms/magiclink-form"
import type { OnAuthFormError, OnAuthFormSuccess } from "./types"

export function LoginCard(
	props: ComponentProps<"div"> & {
		successUrl?: string
		magicLink?: boolean
		emailPassword?: boolean
		guestList?: boolean
	}
) {
	const { authClient, signInRedirect } = useBetterAuth()
	const navigate = useNavigate()

	const [local, rest] = splitProps(props, ["class", "successUrl", "magicLink", "emailPassword", "guestList"])

	const redirectTo = props.successUrl ?? signInRedirect
	if (!redirectTo) throw new Error("pass `successUrl` prop or set `signInRedirect` in BetterAuthProvider")

	const [status, setStatus] = createSignal<{ success: boolean; msg: string }>()
	const onError: OnAuthFormError = (error) => {
		setStatus({
			success: false,
			msg: error.message ?? error.statusText,
		})
	}

	const onSuccess: OnAuthFormSuccess = ({ authFlowCompleted = true, message }) => {
		if (authFlowCompleted) {
			setStatus({
				success: true,
				msg: message ?? "Login successful. Redirecting...",
			})
			// put in brief delay before redirecting to work around bug in better-auth + possible solidjs proxy object
			// that returns {isPrending: false, data: null, error: null} in session() even though user is logged in
			// It seems that better-auth + solidjs needs a bit of time for various states to be consistent
			setTimeout(() => {
				navigate(redirectTo)
			}, 20)
		} else {
			setStatus({
				success: true,
				msg: message ?? "",
			})
		}
	}

	return (
		<div class={cn("flex flex-col gap-2", local.class)} {...rest}>
			<Card>
				<CardHeader class="text-center">
					<CardTitle class="text-xl">Login to your account</CardTitle>
				</CardHeader>

				<CardContent>
					<div class="flex flex-col gap-12">
						<Show when={local.magicLink}>
							<MagicLinkForm
								authClient={authClient}
								callbackUrl={redirectTo}
								onError={onError}
								onSuccess={onSuccess}
							/>
						</Show>

						<Show when={local.emailPassword}>
							<EmailPasswordForm authClient={authClient} onError={onError} onSuccess={onSuccess} />
						</Show>

						<Show when={local.guestList}>
							<GuestListForm authClient={authClient} onError={onError} onSuccess={onSuccess} />
						</Show>
					</div>
				</CardContent>
			</Card>

			<div class="min-h-8 text-center">
				<Show when={status()}>
					<p class={`text-sm pt-2 ${status()?.success ? "text-green-500" : "text-red-500"}`}>
						{status()?.msg}
					</p>
				</Show>
			</div>

			<div class="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
				By continuing, you agree to our <A href="/terms">Terms of Service</A> and{" "}
				<A href="/privacy">Privacy Policy</A>.
			</div>
		</div>
	)
}
