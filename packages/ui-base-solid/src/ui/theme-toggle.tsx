import { Show } from "solid-js"
import { useUi } from "../context"
import { IconMoon, IconSunFilled } from "../icons"
import { Button } from "."

export function ThemeToggle() {
	const { theme, toggleTheme } = useUi()

	return (
		<Button variant="outline" onClick={() => toggleTheme()}>
			<Show when={theme() === "dark"} fallback={<IconMoon />}>
				<IconSunFilled />
			</Show>
		</Button>
	)
}
