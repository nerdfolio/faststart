import { A } from "@solidjs/router"
import { type ComponentProps, For } from "solid-js"
import { cn } from "../utils"

type NavMenuItem = {
	title: string
	href: string
}

export default function NavLinks(props: ComponentProps<"nav"> & { links: NavMenuItem[]; linkClass?: string }) {
	return (
		<nav class={cn("flex flex-wrap justify-center gap-10", props.class)}>
			<For each={props.links}>
				{(link) => (
					<A href={link.href} class={props.linkClass}>
						{link.title}
					</A>
				)}
			</For>
		</nav>
	)
}
