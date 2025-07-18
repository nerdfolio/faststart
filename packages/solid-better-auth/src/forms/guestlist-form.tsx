import { createResource, Show } from "solid-js"
import { useBetterAuth } from "../context"
import { useBetterAuthForm } from "./form-hook"

export function GuestListForm() {
	const { authClient, navigateToLoginSuccess } = useBetterAuth()

	const form = useBetterAuthForm(() => ({
		defaultValues: {
			name: "",
		},
		onSubmit: async ({ value }) => {
			await authClient.signIn.guestList(value)
			navigateToLoginSuccess()
		},
	}))

	const [guestNames] = createResource(async () => {
		const resp = await authClient.signIn.guestList.reveal()
		return resp.data?.join(", ") ?? "Enter guest name"
	})

	return (
		<Show when={!guestNames.loading}>
			<form
				onSubmit={(e) => {
					e.preventDefault()
					e.stopPropagation()
					form.handleSubmit()
				}}
			>
				<form.AppForm>
					<div class="flex flex-col gap-6">
						<form.AppField name="name">
							{(field) => <field.TextField placeholder={guestNames()} required />}
						</form.AppField>
						<form.SubmitButton />
					</div>
				</form.AppForm>
			</form>
		</Show>
	)
}
