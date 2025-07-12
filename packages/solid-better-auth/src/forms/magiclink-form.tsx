import { useBetterAuth } from "~/context"
import { useBetterAuthForm } from "./form-hook"

export function MagicLinkForm(props: { callbackUrl?: string }) {
	const { authClient, callbackUrl: getCallbackURL } = useBetterAuth()

	const form = useBetterAuthForm(() => ({
		defaultValues: {
			email: "",
		},
		onSubmit: async ({ value: { email } }) => {
			console.log("form value", email)
			await authClient.signIn.magicLink({ email, callbackURL: props.callbackUrl ?? getCallbackURL() })
			console.log("SHOW USER A MESSAGE ABOUT LINK SENT")
		},
	}))

	return (
		<form.AppForm>
			<div class="flex flex-col gap-6">
				<form.AppField name="email">{(field) => <field.TextField type="email" required />}</form.AppField>

				<form.SubmitButton label="Send magic link" />
			</div>
		</form.AppForm>
	)
}
