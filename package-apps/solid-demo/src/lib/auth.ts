import { initServerAuth } from "auth"
import { db } from "./db"

//
// NOTE: Per better-auth docs, `src/lib/auth.ts` is one of the few locations this file can be
// so don't just move it anywhere. Consult https://www.better-auth.com/docs/installation for more info.
//
export const auth = initServerAuth(db, {
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: false,
		autoSignIn: true,
	},
})
