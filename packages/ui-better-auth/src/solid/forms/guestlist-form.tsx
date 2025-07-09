import { Button, Input } from "@nerdfolio/ui-base-solid/ui"
import { createForm } from "@tanstack/solid-form"
import { useQuery } from "@tanstack/solid-query"
import { useBetterAuth } from "../context"

export function GuestListForm() {
	const { authClient, navigateToLoginSuccess } = useBetterAuth()

	const form = createForm(() => ({
		defaultValues: {
			name: "",
		},
		onSubmit: async (values) => {
			console.log("form values", values)
		},
	}))

	const placeholderQuery = useQuery(() => ({
		queryKey: ["revealGuestList"],
		initialData: ["guestlist placeholder"],
		queryFn: authClient.signIn.guestList.reveal,
		select: (data) => data.join(", "),
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
				<form.Field name="name">
					{(field) => <Input name={field().name} type="text" placeholder={placeholderQuery.data} required />}
				</form.Field>

				<Button type="submit" class="w-full relative" disabled={isSubmitting()}>
					Sign in
				</Button>
			</div>
		</form>
	)
}
