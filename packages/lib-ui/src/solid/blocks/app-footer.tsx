import type { ComponentProps } from "solid-js"
import { cn } from "../../utils"

export default function AppFooter(props: ComponentProps<"footer">) {
	return <footer class={cn("max-w-screen px-4 py-10", props.class)}>{props.children}</footer>
}
