import { useSignOut } from "auth/solidstart/auth-client"

export default function LogoutPage() {
	// This page exists for convenience during dev if the ui is in a bad state and
	// we need to force a logout.
	useSignOut()()
	return null
}
