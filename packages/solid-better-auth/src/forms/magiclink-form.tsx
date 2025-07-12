import { Button, Input } from "@nerdfolio/ui-base-solid/ui"
import { createForm } from "@tanstack/solid-form"
import { useBetterAuth } from "~/context"

export default function MagicLinkForm(props: { callbackURL?: string }) {
	const { authClient, callbackURL: getCallbackURL } = useBetterAuth()

	const form = createForm(() => ({
		defaultValues: {
			email: "",
		},
		onSubmit: async ({ value: { email } }) => {
			console.log("form value", email)
			await authClient.signIn.magicLink({ email, callbackURL: props.callbackURL ?? getCallbackURL() })
			console.log("DO SOMETHING")
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

				<Button type="submit" class="w-full relative" disabled={isSubmitting()}>
					Send magic link
				</Button>
			</div>
		</form>
	)
}
