import { Button, Input, Spinner } from "@nerdfolio/ui-base-solid/ui"
import { action, useSubmission } from "@solidjs/router"
import type { BetterAuthClient, OnAuthFormError, OnAuthFormSuccess } from "~/solidstart/types"

export default function MagicLinkForm(props: {
	callbackUrl: string
	authClient: BetterAuthClient
	onError?: OnAuthFormError
	onSuccess?: OnAuthFormSuccess
}) {
	let formRef!: HTMLFormElement

	const signInAction = action(
		async (formData: FormData) => {
			const { error } = await props.authClient.signIn.magicLink({
				email: formData.get("email")?.toString() ?? "",
				callbackURL: props.callbackUrl,
			})

			if (error) {
				props.onError?.(error)
			} else {
				formRef.reset()
				props.onSuccess?.({
					authFlowCompleted: false,
					message: `Check ${formData.get("email")} for your magic link.`,
				})
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
