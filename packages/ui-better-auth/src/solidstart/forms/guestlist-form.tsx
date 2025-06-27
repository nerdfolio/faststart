import { Button, Input, Spinner } from "@nerdfolio/ui-base-solid/ui"
import { action, createAsync, useNavigate, useSubmission } from "@solidjs/router"
import type { Setter } from "solid-js"
import type { BetterAuthClient } from "../types"

export default function GuestListForm(props: {
	successUrl: string
	authClient: BetterAuthClient
	setErrorMsg: Setter<string>
	setSuccessMsg: Setter<string>
}) {
	let formRef!: HTMLFormElement

	const navigate = useNavigate()

	const signInAction = action(
		async (formData: FormData) => {
			const { error } = await props.authClient.signIn.guestList({
				name: formData.get("name")?.toString() ?? "",
				fetchOptions: {
					onSuccess() {
						navigate(props.successUrl)
					},
				},
			})

			if (error) {
				console.log("error", error)
				props.setErrorMsg(error?.message ?? error.statusText)
			} else {
				formRef.reset()
			}
		},
		{
			name: "signInGuestList",
		}
	)

	const submission = useSubmission(signInAction)

	const guestNames = createAsync(async () => {
		const names = await props.authClient.signIn.guestList.reveal().then(({ data, error: _e }) => data?.join(", "))
		console.log("guest names", names)
		return names
	})

	return (
		<form action={signInAction} method="post" ref={formRef}>
			<div class="flex flex-col gap-6">
				<Input name="name" placeholder={guestNames()} required />
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
