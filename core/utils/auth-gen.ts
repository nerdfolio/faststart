//
// Export "auth" so remult-better-auth config-parser will pick it up for auth schema generation.
// This "auth" object is only used for that.
//
// Actual auth configuration should be done in individual apps where actual data provider bindings are available
//

import { remultAdapter } from "@nerdfolio/remult-better-auth"
import { Remult } from "remult"
import { initBetterAuth } from "../auth/config"

// with the proper database adapter.
export const auth = initBetterAuth({
	database: remultAdapter(new Remult(), { authEntities: {} }),
})
