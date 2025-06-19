import { IconLoader3 } from "@tabler/icons-solidjs"
import { cn } from "./utils"

function Spinner(props: { class?: string }) {
	return <IconLoader3 class={cn("animate-spin text-muted-foreground", props.class)} />
}

export { Spinner }
