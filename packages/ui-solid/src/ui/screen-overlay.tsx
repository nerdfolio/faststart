import type { ComponentProps } from "solid-js"
import { cn } from "../utils"

export function ScreenOverlay(props: ComponentProps<"div">) {
	return (
		<div
			class={cn(
				"w-full h-full fixed flex place-items-center top-0 left-0 bg-black/80 backdrop-blur-xs z-50",
				props.class
			)}
		>
			<div class="mx-auto">{props.children}</div>
		</div>
	)
}
