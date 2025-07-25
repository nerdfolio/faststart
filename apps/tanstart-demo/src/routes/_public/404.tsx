import { createFileRoute, Link } from "@tanstack/solid-router"

export const Route = createFileRoute("/_public/404")({
	component: NotFound,
})

function NotFound() {
	return (
		<main class="text-center mx-auto text-gray-700 p-4">
			<h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">Not Found</h1>
			<p class="mt-8">
				Visit{" "}
				<a href="https://solidjs.com" target="_blank" rel="noreferrer" class="text-sky-600 hover:underline">
					solidjs.com
				</a>{" "}
				and{" "}
				<a href="https://tanstack.com/" target="_blank" rel="noreferrer" class="text-sky-600 hover:underline">
					TanStack
				</a>{" "}
				to learn how to build Solid apps.
			</p>
			<p class="my-4">
				<Link to="/" class="text-sky-600 hover:underline">
					Home
				</Link>
				{" - "}
				<Link to="/about" class="text-sky-600 hover:underline">
					About
				</Link>
				<Link to="/about" class="text-sky-600 hover:underline">
					Roadmap
				</Link>
			</p>
		</main>
	)
}
