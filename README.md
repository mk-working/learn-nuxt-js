# Nuxt Dojo

A small Nuxt learning project that demonstrates pages, layouts, components, typed data fetching, Tailwind styling, and Nitro server API routes.

## Setup

Install dependencies:

```bash
npm install
```

Copy the optional environment template if you want to experiment with private runtime config:

```bash
cp .env.example .env
```

## Development

Start the Nuxt dev server:

```bash
npm run dev
```

The app usually runs at `http://localhost:3000`. If another local process already owns that port, Nuxt may choose another one.

## Quality Checks

Run these before committing changes:

```bash
npm run format:check
npm run typecheck
npm run build
npm audit
```

Use `npm run format` to apply Prettier formatting.

## Project Notes

- App pages and components live in `app/`.
- Server API routes live in `server/api/`.
- Product pages call local `/api/products` routes instead of fetching third-party data directly from page components.
- `server/utils/products.ts` tries the Fake Store API first and falls back to local sample products so the app still works offline.
