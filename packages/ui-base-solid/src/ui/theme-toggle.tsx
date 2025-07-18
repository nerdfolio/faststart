import { Show } from "solid-js"
import { useUi } from "../context"
import { IconMoon, IconSunFilled } from "../icons"
import { Button } from "."

export function ThemeToggle() {
	const { isDarkMode, toggleDarkMode } = useUi()

	return (
		<Button variant="outline" onClick={() => toggleDarkMode()}>
			<Show when={isDarkMode()} fallback={<IconMoon />}>
				<IconSunFilled />
			</Show>
		</Button>
	)
}
