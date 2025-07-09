import { Button, Input, Spinner } from "@nerdfolio/ui-base-solid/ui"
import { action, createAsync, useSubmission } from "@solidjs/router"
import { Suspense } from "solid-js"
import type { BetterAuthClient, OnAuthFormError, OnAuthFormSuccess } from "../types"

export default function GuestListForm(props: {
	authClient: BetterAuthClient
	onError?: OnAuthFormError
	onSuccess?: OnAuthFormSuccess
}) {
	let formRef!: HTMLFormElement

	const signInAction = action(
		async (formData: FormData) => {
			const { error, user } = await props.authClient.signIn.guestList({
				name: formData.get("name")?.toString() ?? "",
			})

			if (error) {
				props.onError?.(error)
			} else {
				formRef.reset()
				props.onSuccess?.({})
			}
		},
		{
			name: "signInGuest",
		}
	)

	const submission = useSubmission(signInAction)

	const placeholder = createAsync<string>(
		async () => {
			const names = await props.authClient.signIn.guestList
				.reveal()
				.then(({ data, error: _e }) => data?.join(", "))
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
