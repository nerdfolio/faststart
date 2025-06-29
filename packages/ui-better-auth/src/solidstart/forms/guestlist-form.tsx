import { Button, Input, Spinner } from "@nerdfolio/ui-base-solid/ui"
import { action, createAsync, useNavigate, useSubmission } from "@solidjs/router"
import { type Setter, Suspense } from "solid-js"
import type { LoginStatus } from "../login-card"
import type { BetterAuthClient } from "../types"

export default function GuestListForm(props: {
	successUrl: string
	authClient: BetterAuthClient
	setStatus: Setter<LoginStatus>
}) {
	let formRef!: HTMLFormElement

	const navigate = useNavigate()

	const signInAction = action(
		async (formData: FormData) => {
			const {error} = await props.authClient.signIn.guestList({
				name: formData.get("name")?.toString() ?? "",
			})

			if (error) {
				props.setStatus({ error })
			} else {
				formRef.reset()
				navigate(props.successUrl)
			}
		},
		{
			name: "signInGuest",
		}
	)

	const submission = useSubmission(signInAction)

	const placeholder = createAsync<string>(
		async () => {
			const names = await props.authClient.signIn.guestList.reveal().then(({ data, error: _e }) => data?.join(", "))
			return names
		},
		{ initialValue: "Enter guest name" }
	)

	return (
		<Suspense>
			<form action={signInAction} method="post" ref={formRef}>
				<div class="flex flex-col gap-6">
					<Input name="name" placeholder={placeholder()} required />
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
		</Suspense>
	)
}
