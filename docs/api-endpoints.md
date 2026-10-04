# API Endpoints

Base URL: `NEXT_PUBLIC_APP_URL`. All responses are JSON.

**Auth levels:** `Public` (none) · `User` (signed-in session) · `CMS key` (`Authorization: Bearer <CMS_API_KEY>`).
Sessions are Neon Auth cookies. `requireAuth` also creates the app `user` row on first call.

## Public

| Method | Path | Notes |
| --- | --- | --- |
| GET | `/api/videos` | All videos |
| GET | `/api/videos/latest` | Latest 12 |
| GET | `/api/videos/trending` | Top 12 by views, then likes |
| GET | `/api/videos/[id]` | Single video (404 if missing) |
| GET | `/api/videos/[id]/comments` | Comments for a video |
| GET | `/api/collections` | All collections |
| GET | `/api/collections/[slug]` | Collection (looked up by **id**) plus `videos[]` |
| GET | `/api/search?q=&limit=` | `q` 1–120 chars, `limit` 1–30 (default 12) |
| POST | `/api/analytics/view` | Body `{ videoId?: uuid, collectionId?: uuid }`; increments view counts |

## User

| Method | Path | Notes |
| --- | --- | --- |
| GET | `/api/profile` | Current user (`id,email,name,image,emailVerified`); 401 if signed out |
| GET | `/api/videos/[id]/like` | `{ liked: boolean }` (`false` when signed out) |
| POST | `/api/videos/[id]/like` | Like (idempotent) |
| DELETE | `/api/videos/[id]/like` | Unlike (idempotent) |
| POST | `/api/videos/[id]/comments` | Body `{ body: string 1–1000 }` |
| PATCH | `/api/videos/[id]/comments` | Body `{ body }` — **`[id]` is the comment id** |
| DELETE | `/api/videos/[id]/comments` | **`[id]` is the comment id** |

## CMS (requires `Authorization: Bearer <CMS_API_KEY>`)

Set `CMS_API_KEY` in the environment; if unset, these endpoints reject every request (401). Call them from the CMS backend so the key never reaches browser code.

| Method | Path | Body |
| --- | --- | --- |
| POST | `/api/admin/videos` | `{ youtubeId, title, description?, thumbnailUrl?, collectionId?, publishedAt? }` → 201 |
| PATCH | `/api/admin/videos/[id]` | same schema as POST (all of `youtubeId`, `title` required) |
| DELETE | `/api/admin/videos/[id]` | — |
| POST | `/api/admin/collections` | `{ name, description?, thumbnail? }` → 201 |
| PATCH | `/api/admin/collections/[id]` | same schema as POST |
| DELETE | `/api/admin/collections/[id]` | — |

Known gaps: the collection table also has `event_type, date, venue, participants, detailInfo, organizer, edition, theme`, but `adminCollectionSchema` does not accept them. Video `isPublished` is not settable either.

## Auth handler

`GET|POST /api/auth/[...path]` — Neon Auth (sign-in, sign-up, session, sign-out). Not covered by CORS.

## Errors

`{ error: string }` with 400 (bad request), 401, 403, 404, 500.

## CORS

Implemented in `proxy.ts` for `/api/*` except `/api/auth/*`.

- Allowed origin: `https://fc-os.tech` (exact match; edit `allowedOrigins` to add more)
- Methods: `GET, POST, PATCH, DELETE, OPTIONS`
- Headers: `Content-Type, Authorization`
- Preflight cached 24h. Credentials are not allowed (no cookies needed).

CORS only constrains browsers; the API key is what protects the CMS endpoints.
