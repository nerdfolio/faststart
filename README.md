# Faststart monorepo

Quickly get a Solidjs startup project up and running


## What is included in this starter template:

- vitest + vite-plugin-doctest
- biomejs
- tailwindcss v4
- cloudflare + wrangler
- solid-ui https://www.solid-ui.com/docs/introduction
- better-auth (with magic link that mocks email sending via server console.log)
- Remult

Basic navbar and sidebar layouts are also provided. User avatar, login, logout menus are setup.


## Cloudflare setup resources
 - https://developers.cloudflare.com/pages/framework-guides/deploy-a-solid-start-site/ (has bindings info)
 - https://ryanjc.com/blog/solidstart-cloudflare-pages/
 - https://github.com/cloudflare/workers-sdk/issues/5912
 - https://github.com/solidjs/solid-start/issues/1833
 - https://github.com/cloudflare/workers-sdk/issues/4548 (understand the hash of the local D1 filename)
 - https://github.com/cloudflare/miniflare/releases/tag/v3.20230918.0 (code to generate local D1 filename)
