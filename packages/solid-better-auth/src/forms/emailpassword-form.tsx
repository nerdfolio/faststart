import { Button, Input } from "@nerdfolio/ui-base-solid/ui"
import { createForm } from "@tanstack/solid-form"
import { useBetterAuth } from "../context"

export default function EmailPasswordForm() {
	const { authClient, navigateToLoginSuccess } = useBetterAuth()

	const form = createForm(() => ({
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
	const isSubmitting = form.useStore((state) => state.isSubmitting)

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault()
				e.stopPropagation()
				form.handleSubmit()
			}}
		>
			<div class="flex flex-col gap-6">
				<form.Field name="email">
					{(field) => (
						<Input
							name={field().name}
							type="email"
							value={field().state.value}
							placeholder="user@example.com"
							onInput={(e) => field().handleChange(e.target.value)}
							required
						/>
					)}
				</form.Field>

				<form.Field name="password">
					{(field) => (
						<Input
							name={field().name}
							type="password"
							value={field().state.value}
							placeholder="***"
							onInput={(e) => field().handleChange(e.target.value)}
							required
						/>
					)}
				</form.Field>

				<Button type="submit" class="w-full relative" disabled={isSubmitting()}>
					Sign in
				</Button>
			</div>
		</form>
	)
}
