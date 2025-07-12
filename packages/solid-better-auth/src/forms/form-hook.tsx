import { Button, Input } from "@nerdfolio/ui-base-solid/ui"
import { cn } from "@nerdfolio/ui-base-solid/utils"
import { createFormHook, createFormHookContexts } from "@tanstack/solid-form"
import { type ComponentProps, splitProps } from "solid-js"

export const { fieldContext, formContext, useFieldContext, useFormContext } = createFormHookContexts()

function TextField(props: Omit<ComponentProps<"input">, "type"> & { type?: "text" | "email" | "password" }) {
	// The `Field` infers that it should have a `value` type of `string`
	const field = useFieldContext<string>()

	const [local, rest] = splitProps(props, ["placeholder"])
	const placeholder =
		local.placeholder ??
		(props.type === "password" ? "*****" : props.type === "email" ? "u@example.com" : undefined)

	return (
		<Input
			name={field().name}
			value={field().state.value}
			onInput={(e) => field().handleChange(e.target.value)}
			placeholder={placeholder}
			{...rest}
		/>
	)
}

function SubmitButton(props: { label?: string; class?: string }) {
	const form = useFormContext()

	return (
		<form.Subscribe
			selector={(state) => ({
				canSubmit: state.canSubmit,
				isSubmitting: state.isSubmitting,
			})}
		>
			{(state) => (
				<Button type="submit" class={cn("w-full", props.class)} disabled={!state().canSubmit}>
					{state().isSubmitting ? "..." : (props.label ?? "Sign In")}
				</Button>
			)}
		</form.Subscribe>
	)
}

export const { useAppForm: useBetterAuthForm } = createFormHook({
	fieldContext,
	formContext,
	fieldComponents: {
		TextField,
	},
	formComponents: {
		SubmitButton,
	},
})
