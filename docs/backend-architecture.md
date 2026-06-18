# FC-TV Backend Architecture

## 1. Architectural decisions

### Auth choice

- Neon Auth (using the Better Auth-compatible integration path)
- Why?
    - it fits the Neon database-first model
    - it gives us a managed identity layer without building custom auth infrastructure
    - it keeps session management and provider flows simpler for a future mobile/web app

> In this repo, the application will keep a local `users` profile table for roles and display data, while Neon Auth manages the actual credential/session lifecycle.

### Storage model

- Videos are **not** stored in our infrastructure.
- The backend stores only:
    - YouTube video IDs
    - metadata
    - collection relationships
    - analytics and engagement data
- This keeps the platform lightweight and avoids unnecessary file-storage complexity.

### API style

- Use Next.js App Router **Route Handlers** for all backend logic.
- Keep business logic in a service layer so handlers stay thin and testable.
- Use Zod for request validation and response shaping.

## 2. Database design

Core entities:

- `users`
- `sessions`
- `accounts`
- `verifications`
- `collections`
- `videos`
- `comments`
- `likes`
- `video_views`
- `collection_views`

### Why this schema works

- `users` keeps profile data separate from auth provider state.
- `sessions` and `accounts` are retained so the app can support auditing, role checks, and future provider migrations.
- `collections` and `videos` separate content metadata from relationships.
- `likes`, `comments`, and analytics tables support per-user interaction tracking without duplicating user info.

### Important relationships

- One user can create many comments.
- One user can like many videos.
- One video can have many comments and many likes.
- One collection can contain many videos.
- One video belongs to zero or one collection.
- One video can have many view records, one per user/session combination.

## 3. Search strategy

- Use PostgreSQL full-text search (`tsvector` + GIN index).
- Search fields:
    - video title
    - video description
    - collection name
    - collection description
- This gives us better ranking and scalability than repeated `ILIKE` scans.

## 4. Folder structure

src/
app/
api/
auth/
videos/
collections/
comments/
search/
analytics/
admin/
profile/
components/
database/
db.ts
schemas/
migrations/
lib/
auth.ts
constants.ts
utils.ts
services/
videos.ts
collections.ts
comments.ts
analytics.ts
validations/
auth.ts
videos.ts
collections.ts
comments.ts
profile.ts
analytics.ts
scripts/
seed.ts

## 5. API surface

### Auth

- POST `/api/auth/sign-up`
- POST `/api/auth/sign-in`
- POST `/api/auth/sign-out`
- GET `/api/auth/me`

### Videos

- GET `/api/videos`
- GET `/api/videos/latest`
- GET `/api/videos/trending`
- GET `/api/videos/[id]`

### Collections

- GET `/api/collections`
- GET `/api/collections/[slug]`

### Search

- GET `/api/search`

### Likes

- POST `/api/videos/[id]/like`
- DELETE `/api/videos/[id]/like`

### Comments

- GET `/api/videos/[id]/comments`
- POST `/api/videos/[id]/comments`
- PATCH `/api/comments/[id]`
- DELETE `/api/comments/[id]`

### Profile

- GET `/api/profile`
- PATCH `/api/profile`

### Analytics

- POST `/api/analytics/view`

### Admin

- POST `/api/admin/videos`
- PATCH `/api/admin/videos/[id]`
- DELETE `/api/admin/videos/[id]`
- POST `/api/admin/collections`
- PATCH `/api/admin/collections/[id]`
- DELETE `/api/admin/collections/[id]`

## 6. Implementation plan

1. Define Drizzle schemas and migrations.
2. Configure Neon Auth with the Better Auth-compatible setup.
3. Build reusable validation schemas.
4. Implement service layer for videos, collections, comments, analytics.
5. Implement route handlers for auth, content, profile, and analytics.
6. Add seed data for local development.
7. Verify with build and lint checks.

## 7. Tradeoffs

- Using a relational schema keeps queries predictable and avoids overengineering.
- Storing analytics as raw view events is simple now and can later be summarized into materialized tables.
- The current comment model is single-level to keep V1 straightforward, while still leaving room for nested threads later.
