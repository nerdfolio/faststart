import { useBetterAuth } from "../context"
import { useBetterAuthForm } from "./form-hook"

export function EmailPasswordForm() {
	const { authClient, navigateToLoginSuccess } = useBetterAuth()

	const form = useBetterAuthForm(() => ({
		defaultValues: {
			email: "",
			password: "",
		},
		onSubmit: async ({ value }) => {
			console.log("form value", value)
			await authClient.signIn.email(value)
			navigateToLoginSuccess()
		},
	}))

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault()
				e.stopPropagation()
				form.handleSubmit()
			}}
		>
			<form.AppForm>
				<div class="flex flex-col gap-6">
					<form.AppField name="email">
						{(field) => <field.TextField type="email" required autocomplete="username" />}
					</form.AppField>

					<form.AppField name="password">
						{(field) => <field.TextField type="password" required autocomplete="current-password" />}
					</form.AppField>

					<form.SubmitButton />
				</div>
			</form.AppForm>
		</form>
	)
}
