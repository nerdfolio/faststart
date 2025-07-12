import { Button, Input } from "@nerdfolio/ui-base-solid/ui"
import { createForm } from "@tanstack/solid-form"
import { useQuery } from "@tanstack/solid-query"
import { Suspense } from "solid-js"
import { useBetterAuth } from "../context"

export function GuestListForm() {
	const { authClient, navigateToLoginSuccess } = useBetterAuth()

	const form = createForm(() => ({
		defaultValues: {
			name: "",
		},
		onSubmit: async ({ value }) => {
			await authClient.signIn.guestList(value)
			navigateToLoginSuccess()
		},
	}))
	const isSubmitting = form.useStore((state) => state.isSubmitting)

	const placeholderQuery = useQuery(() => ({
		queryKey: ["revealGuestList"],
		initialData: "guestlist placeholder",
		queryFn: async () => {
			const resp = await authClient.signIn.guestList.reveal()
			return resp.data.join(", ")
		},
	}))

	return (
		<Suspense>
			<form
				onSubmit={(e) => {
					e.preventDefault()
					e.stopPropagation()
					form.handleSubmit()
				}}
			>
				<div class="flex flex-col gap-6">
					<form.Field name="name">
						{(field) => (
							<Input
								name={field().name}
								type="text"
								value={field().state.value}
								placeholder={placeholderQuery.data}
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
		</Suspense>
	)
}
