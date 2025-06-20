import { action, useSubmission } from "@solidjs/router"
import type { Setter } from "solid-js"
import { Button } from "ui-base-solid/ui/button"
import { Input } from "ui-base-solid/ui/input"
import Spinner from "ui-base-solid/ui/spinner"
import type { BetterAuthClient } from "~/solidstart/types"

export default function MagicLinkForm(props: {
	callbackUrl: string
	authClient: BetterAuthClient
	setErrorMsg: Setter<string>
	setSuccessMsg: Setter<string>
}) {
	let formRef!: HTMLFormElement

	const signInAction = action(
		async (formData: FormData) => {
			const { error } = await props.authClient.signIn.magicLink({
				email: formData.get("email")?.toString() ?? "",
				callbackURL: props.callbackUrl,
			})

			if (error) {
				console.error("error", error)
				props.setErrorMsg(error?.message ?? error.statusText)
			} else {
				formRef.reset()
				props.setSuccessMsg(`Check ${formData.get("email")} for your magic link.`)
			}
		},
		{
			name: "signInWithMagicLink",
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
