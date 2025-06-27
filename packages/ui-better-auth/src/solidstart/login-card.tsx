import { Card, CardContent, CardHeader, CardTitle } from "@nerdfolio/ui-base-solid/ui"
import { cn } from "@nerdfolio/ui-base-solid/utils"
import { A } from "@solidjs/router"
import { type ComponentProps, createSignal, Show, splitProps } from "solid-js"
import EmailPasswordForm from "./forms/emailpassword-form"
import GuestListForm from "./forms/guestlist-form"
import MagicLinkForm from "./forms/magiclink-form"
import type { BetterAuthClient } from "./types"

export default function LoginCard(
	props: ComponentProps<"div"> & {
		successUrl: string
		authClient: BetterAuthClient
		magicLink?: boolean
		emailPassword?: boolean
		guestList?: boolean
	}
) {
	const [local, rest] = splitProps(props, [
		"class",
		"authClient",
		"successUrl",
		"magicLink",
		"emailPassword",
		"guestList",
	])

	const [errorMsg, setErrorMsg] = createSignal("")
	const [successMsg, setSuccessMsg] = createSignal("")

	return (
		<div class={cn("flex flex-col gap-6", local.class)} {...rest}>
			<Card>
				<CardHeader class="text-center">
					<CardTitle class="text-xl">Login to your account</CardTitle>
				</CardHeader>

				<CardContent>
					<div class="flex flex-col gap-12">
						<Show when={local.emailPassword}>
							<EmailPasswordForm
								authClient={props.authClient}
								successUrl={props.successUrl}
								setErrorMsg={setErrorMsg}
								setSuccessMsg={setSuccessMsg}
							/>
						</Show>
						<Show when={local.magicLink}>
							<MagicLinkForm
								authClient={props.authClient}
								successUrl={props.successUrl}
								setErrorMsg={setErrorMsg}
								setSuccessMsg={setSuccessMsg}
							/>
						</Show>
						<Show when={local.guestList}>
							<GuestListForm
								authClient={props.authClient}
								successUrl={props.successUrl}
								setErrorMsg={setErrorMsg}
								setSuccessMsg={setSuccessMsg}
							/>
						</Show>
					</div>
				</CardContent>
			</Card>

			<div class="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
				By continuing, you agree to our <A href="/terms">Terms of Service</A> and <A href="/privacy">Privacy Policy</A>.
			</div>
		</div>
	)
}

/*
						<div>
						{errorMsg() ? <p class="text-sm text-red-500 pt-2">{errorMsg()}</p> : null}
						{successMsg() ? <p class="text-sm text-green-500 pt-2">{successMsg()}</p> : null}
					</div>
			</div>
*/
