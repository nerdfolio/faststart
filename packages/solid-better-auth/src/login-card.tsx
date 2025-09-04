import { Card, CardContent, CardHeader, CardTitle } from "ui-solid/ui"
import { cn } from
"ui-solid

import { type ComponentProps, type JSXElement, Show, splitProps } from "solid-js"

export function LoginCard(props: ComponentProps<typeof Card> & { footer?: JSXElement }) {
	const [local, rest] = splitProps(props, ["class", "footer"])

	return (
		<div class={cn("flex flex-col gap-2", local.class)} {...rest}>
			<Card>
				<CardHeader class="text-center">
					<CardTitle class="text-xl">Login to your account</CardTitle>
				</CardHeader>

				<CardContent>
					<div class="flex flex-col gap-12">{props.children}</div>
				</CardContent>
			</Card>

			<Show when={local.footer}>
				<div class="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
					{local.footer}
				</div>
			</Show>
		</div>
	)
}
