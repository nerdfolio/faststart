import { Alert } from "@nerdfolio/ui-base-solid/ui"
import { createSignal, Show } from "solid-js"
import { useBetterAuth } from "~/context"
import { useBetterAuthForm } from "./form-hook"

export function MagicLinkForm(_props: { callbackUrl?: string }) {
	const { authClient, callbackUrl: getCallbackURL } = useBetterAuth()

	const [linkSent, setLinkSent] = createSignal(false)

	const form = useBetterAuthForm(() => ({
		defaultValues: {
			email: "",
		},
		onSubmit: async ({ value: { email } }) => {
			console.log("form value", email)
			await authClient.signIn.magicLink({ email, callbackURL: props.callbackUrl ?? getCallbackURL() })
			setLinkSent(true)
		},
	}))

	return (
		<Show when={!linkSent()} fallback={<Alert>Magic link sent to {form.state.values.email}</Alert>}>
			<form
				onSubmit={(e) => {
					e.preventDefault()
					e.stopPropagation()
					form.handleSubmit()
				}}
			>
				<div class="flex flex-col gap-6">
					<form.AppField name="email">{(field) => <field.TextField type="email" required />}</form.AppField>

					<form.AppForm>
						<form.SubmitButton label="Send Magic Link" />
					</form.AppForm>
				</div>
			</form>
		</Show>
	)
}
