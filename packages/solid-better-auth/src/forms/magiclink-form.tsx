import { useBetterAuth } from "~/context"
import { useBaForm } from "./use-ba-form"

export function MagicLinkForm(props: { callbackUrl?: string }) {
	const { authClient, callbackUrl: getCallbackURL } = useBetterAuth()

	const form = useBaForm(() => ({
		defaultValues: {
			email: "",
		},
		onSubmit: async ({ value: { email } }) => {
			console.log("form value", email)
			await authClient.signIn.magicLink({ email, callbackURL: props.callbackUrl ?? getCallbackURL() })
			console.log("DO SOMETHING")
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
