import { Button, Input, Spinner } from "@nerdfolio/ui-base-solid/ui"
import { action, useNavigate, useSubmission } from "@solidjs/router"
import type { Setter } from "solid-js"
import type { LoginStatus } from "../login-card"
import type { BetterAuthClient } from "../types"

export default function EmailPasswordForm(props: {
	successUrl: string
	authClient: BetterAuthClient
	setStatus: Setter<LoginStatus>
}) {
	let formRef!: HTMLFormElement

	const navigate = useNavigate()

	const signInAction = action(
		async (formData: FormData) => {
			const { error } = await props.authClient.signIn.email({
				email: formData.get("email")?.toString() ?? "",
				password: formData.get("password")?.toString() ?? "",
			})

			if (error) {
				props.setStatus({ error })
			} else {
				formRef.reset()
				navigate(props.successUrl)
			}
		},
		{
			name: "signInEmailPassword",
		}
	)

	const submission = useSubmission(signInAction)

	return (
		<form action={signInAction} method="post" ref={formRef}>
			<div class="flex flex-col gap-6">
				<Input name="email" type="email" placeholder="m@example.com" required />
				<Input name="password" type="password" placeholder="password" required />
				<Button type="submit" class="w-full relative" disabled={submission.pending}>
					Sign in
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
