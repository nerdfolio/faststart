# fastcore

Package under `faststart`. Meant to provide the server-side foundation to get monorepo app (or apps) started quickly.


## Objectives and Assumptions

1. Currently use [Remult](remult.dev) for the data foundation.
2. Currently use [better-auth](better-auth.com) for authentication.
3. Is the central place to configure auth and data for all apps in monorepo
4. Is the central place for shared models
5. Is the central place for custom data scaffolding and migrations
6. Provide any sever-side utils and glue code that may be helpful for apps.
7. Meant to be agnostic with respect to deployment platforms. Leave that to individual apps in the monorepo.
8. Meant to be agnostic with respect to ui and webframe work. Leave that to individual apps in the monorepo (thus react, solid, svelte, etc. apps can coexist).