import { toSolidStartHandler } from "better-auth/solid-start"
import { auth } from "../../lib/auth"

// https://www.better-auth.com/docs/installation
export const { GET, POST } = toSolidStartHandler(auth)