import { IconSpinner } from "../icons"
import { cn } from "../utils"

export function Spinner(props: { class?: string }) {
	return <IconSpinner class={cn("animate-spin text-muted-foreground", props.class)} />
}
