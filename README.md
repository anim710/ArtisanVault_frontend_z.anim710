# ArtisanVault Frontend

Next.js 14 (App Router) + TypeScript + Tailwind CSS marketplace UI for **ArtisanVault**.

Brand palette: Walnut `#78350F`, Warm Sand `#F59E0B`, Deep Charcoal `#1C1917`.

## Prerequisites

- Node.js 18+
- Backend API running (see `../backend`)

## Quick local setup

```bash
cd frontend
cp .env.example .env.local
# NEXT_PUBLIC_API_URL=http://localhost:5000/api
npm install
npm run dev
```

### Important: do not run `npm audit fix --force`

That command previously downgraded Next to v9 (incompatible with React 18 / App Router) and broke installs.  
If `package.json` shows `"next": "^9.x"`, restore `"next": "14.2.28"` (exact pin), delete `node_modules` + `package-lock.json`, then run `npm install` again.  
Remaining audit findings inside Next’s transitive `postcss`/`sharp` are safe to leave for this student project.

App: [http://localhost:3000](http://localhost:3000)

Start the backend first (`cd ../backend && npm run dev`) so Explore, Highlights, and auth work.

## Environment variables

Create `frontend/.env.local` (never commit):

| Variable | Required | Example | Purpose |
|----------|----------|---------|---------|
| `NEXT_PUBLIC_API_URL` | yes | `http://localhost:5000/api` | Backend API base URL |

JWT tokens are stored in `localStorage` (`av_token`) and sent as `Authorization: Bearer …`.

## Demo credentials

(Seeded by the backend)

| Role | Email | Password |
|------|-------|----------|
| User | `artisan@artisanvault.com` | `Artisan@123` |
| Admin | `admin@artisanvault.com` | `Admin@123` |

Login page includes **Demo user** / **Demo admin** autofill buttons.

## Routes

| Path | Auth | Description |
|------|------|-------------|
| `/` | Public | Landing (hero + 7+ sections) |
| `/explore` | Public | Search, filters, sort, pagination |
| `/crafts/[id]` | Public | Gallery, specs, reviews, related |
| `/about` | Public | About ArtisanVault |
| `/contact` | Public | Contact form + studio info |
| `/login` | Public | Login + demo autofill |
| `/register` | Public | Registration |
| `/dashboard` | Protected | Recharts analytics |
| `/items/add` | Protected | Create craft listing |
| `/items/manage` | Protected | View / delete listings |

Logged-out nav: Home, Explore, About (+ Login/Join).  
Logged-in nav: Home, Explore, Dashboard, Add Piece, Manage, Contact.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Next.js development server |
| `npm run build` | Production build |
| `npm start` | Serve production build |
| `npm test` | Vitest unit/component tests |

## Project file map

```
frontend/
├── src/app/
│   ├── layout.tsx              # Fonts, Navbar, Footer, AuthProvider
│   ├── page.tsx                # Landing composition
│   ├── explore/                # Listing page + filters
│   ├── crafts/[id]/           # Details page
│   ├── login/ register/        # Auth
│   ├── items/add|manage/       # Protected CRUD UI
│   ├── dashboard/              # Charts
│   ├── about/ contact/         # Extra pages
├── src/components/
│   ├── layout/                 # Navbar, Footer, Protected
│   ├── home/                   # Hero + landing sections
│   ├── crafts/                 # Card, Grid, Filters, Skeleton
│   └── ui/                     # Button, Input, Select, Textarea
├── src/lib/                    # api.ts, auth.tsx, utils.ts
├── src/types/                  # Shared DTOs
└── __tests__/                  # Vitest + Testing Library
```

### What each key file does

| File | Functionality | How it’s tested |
|------|---------------|-----------------|
| `lib/api.ts` | Fetch wrapper + JWT header | Indirectly via pages; run against live API |
| `lib/auth.tsx` | Login/register/logout context | Manual: demo login → protected routes |
| `components/crafts/CraftCard.tsx` | Uniform listing card | `__tests__/CraftCard.test.tsx` |
| `components/crafts/CraftFilters.tsx` | Material/category/price/sort | `__tests__/CraftFilters.test.tsx` |
| `app/explore/ExploreClient.tsx` | Query building + pagination | Manual filter/sort flows |
| `app/items/add/page.tsx` | Protected create form | Manual after login |
| `app/items/manage/page.tsx` | Table View/Delete | Manual delete confirmation |
| `app/dashboard/page.tsx` | Recharts from `/stats/overview` | Manual with seeded data |

## Suggested GitHub commit sequence (20+)

1. Next.js + Tailwind + brand tokens + `.gitignore` / `.env.example`
2. Layout shell: Navbar (logged-out) + Footer
3. Hero slider section
4. Landing batch 1: categories, features, highlights
5. Landing batch 2: stats, testimonials, FAQ, newsletter/CTA
6. `lib/api` + TypeScript types
7. Auth context + login + demo buttons
8. Register page
9. Explore grid + CraftCard + skeletons
10. Explore filters (material, category)
11. Price + custom-order + sort + pagination
12. Craft detail: gallery + overview + specs
13. Detail: reviews + related
14. Protected `/items/add`
15. Protected `/items/manage`
16. Navbar logged-in routes + `Protected` guard
17. Dashboard + Recharts
18. About page
19. Contact page
20. README + responsive polish + tests

Push backend through public crafts **before** frontend push #6 so API calls succeed locally.

```bash
git add -A
git commit -m "feat: …"
git push
```

## Deploy hints

- **Vercel:** import the frontend repo, set `NEXT_PUBLIC_API_URL` to your deployed API
- Ensure backend `CLIENT_URL` matches the Vercel origin for CORS

## Design notes

- Cards share `rounded-card` radius, equal grid heights, and the same shadow
- Desktop Explore/Highlights: **4 cards per row**
- Hero height ~**65vh** with auto-advancing slider + CTAs
- No lorem ipsum — all copy is marketplace-specific
