import { useQuery } from "@tanstack/solid-query"
import { Suspense } from "solid-js"
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

	const placeholderQuery = useQuery(() => ({
		queryKey: ["revealGuestList"],
		initialData: "Enter guest name",
		queryFn: async () => {
			const resp = await authClient.signIn.guestList.reveal()
			return resp.data.join(", ")
		},
	}))

	return (
		<Suspense>
			<form.AppForm>
				<div class="flex flex-col gap-6">
					<form.AppField name="name">
						{(field) => <field.TextField placeholder={placeholderQuery.data} required />}
					</form.AppField>
					<form.SubmitButton />
				</div>
			</form.AppForm>
		</Suspense>
	)
}
