import { cn } from "../../utils"
import { IconSpinner } from "../icons"

export default function Spinner(props: { class?: string }) {
	return <IconSpinner class={cn("animate-spin text-muted-foreground", props.class)} />
}
