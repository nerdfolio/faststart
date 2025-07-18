import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export * from "./internal/wrap-link"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}
