import { Button, Input, Spinner } from "@nerdfolio/ui-base-solid/ui"
import { action, useSubmission } from "@solidjs/router"
import type { Setter } from "solid-js"
import type { BetterAuthClient } from "~/solidstart/types"
import type { LoginStatus } from "../login-card"

export default function MagicLinkForm(props: {
	successUrl: string
	authClient: BetterAuthClient
	setStatus: Setter<LoginStatus>
}) {
	let formRef!: HTMLFormElement

	const signInAction = action(
		async (formData: FormData) => {
			const { error } = await props.authClient.signIn.magicLink({
				email: formData.get("email")?.toString() ?? "",
				callbackURL: props.successUrl,
			})

			if (error) {
				props.setStatus({ error })
			} else {
				formRef.reset()
				props.setStatus({ message: `Check ${formData.get("email")} for your magic link.` })
			}
		},
		{
			name: "signInMagicLink",
		}
	)

	const submission = useSubmission(signInAction)

	return (
		<form action={signInAction} method="post" ref={formRef}>
			<div class="flex flex-col gap-6">
				<Input name="email" type="email" placeholder="m@example.com" required />
				<Button type="submit" class="w-full relative" disabled={submission.pending}>
					Send magic link
					{submission.pending ? (
						<span class="absolute w-full px-2 place-items-end">
							<Spinner />
						</span>
					) : null}
				</Button>
			</div>
		</form>
	)
}
