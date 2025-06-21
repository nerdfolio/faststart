# fastcore

Package under `faststart`. Meant to be the server-side foundation of `faststart` to get monorepo app (or apps)
up and running quickly.


## Current dependencies

- [Remult](remult.dev) for the data foundation.
- [better-auth](better-auth.com) for authentication.

## Objectives

1. Be the central place to configure auth and data
1. Be the central place for shared models
1. Be the central place for custom data scaffolding and migrations
1. Provide any sever-side utils and glue code that may be helpful for apps within monorepo.
1. Be agnostic with respect to deployment platforms. Leave that to individual apps in the monorepo.
1. Be agnostic with respect to ui and webframe work. Leave that to individual apps in the monorepo (thus react, solid, svelte, etc. apps can coexist).