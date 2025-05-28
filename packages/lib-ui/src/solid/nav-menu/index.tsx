import { For } from "solid-js"
import type { NavMenu } from "./type"

export default function NavMenus(props: { menus: NavMenu[] }) {
	return (
		<For each={props.menus}>
			{(menu) => (
				<menu.renderer label={menu.label} items={menu.items} class={menu.rendererClass} linkClass={menu.linkClass} />
			)}
		</For>
	)
}
