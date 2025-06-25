import { Card, CardContent, CardHeader, CardTitle } from "@nerdfolio/ui-base-solid/ui"
import { cn } from "@nerdfolio/ui-base-solid/utils"
import { A } from "@solidjs/router"
import { type ComponentProps, createSignal, Show, splitProps } from "solid-js"
import EmailPasswordForm from "./forms/emailpassword-form"
import MagicLinkForm from "./forms/magiclink-form"
import type { BetterAuthClient } from "./types"

export default function LoginCard(
	props: ComponentProps<"div"> & {
		callbackUrl: string
		authClient: BetterAuthClient
		magicLink?: boolean
		emailPassword?: boolean
	}
) {
	const [local, rest] = splitProps(props, ["class", "magicLink", "emailPassword"])

	const { magicLink = true, emailPassword = false } = local

	const [errorMsg, setErrorMsg] = createSignal("")
	const [successMsg, setSuccessMsg] = createSignal("")

	console.log("props", props)

	return (
		<div class={cn("flex flex-col gap-6", local.class)} {...rest}>
			<Card>
				<CardHeader class="text-center">
					<CardTitle class="text-xl">Login to your account</CardTitle>
				</CardHeader>

				<CardContent>
					<div class="flex flex-col gap-12">
						<Show when={emailPassword}>
							<EmailPasswordForm
								authClient={props.authClient}
								callbackUrl={props.callbackUrl}
								setErrorMsg={setErrorMsg}
								setSuccessMsg={setSuccessMsg}
							/>
						</Show>
						<Show when={magicLink}>
							<MagicLinkForm
								authClient={props.authClient}
								callbackUrl={props.callbackUrl}
								setErrorMsg={setErrorMsg}
								setSuccessMsg={setSuccessMsg}
							/>
						</Show>
					</div>
					<div>
						{errorMsg() ? <p class="text-sm text-red-500 pt-2">{errorMsg()}</p> : null}
						{successMsg() ? <p class="text-sm text-green-500 pt-2">{successMsg()}</p> : null}
					</div>
				</CardContent>
			</Card>
			<div class="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
				By continuing, you agree to our <A href="/terms">Terms of Service</A> and <A href="/privacy">Privacy Policy</A>.
			</div>
		</div>
	)
}
