# Thoughts Section — Implementation Plan

A private, password-gated markdown editor at `/page/thoughts/write` that commits `.md` files to this GitHub repo, and a public reading experience at `/page/thoughts`. No database. Existing Hashnode `/page/blogs` stays untouched.

---

## 1. Architecture

```
Browser (login modal)
   └─> POST /api/thoughts/auth/login   → verify against env creds → set httpOnly JWT cookie
Editor (/page/thoughts/write)
   ├─> POST /api/thoughts/upload       → ImageKit → returns CDN url
   └─> POST /api/thoughts/posts        → GitHub Contents API → commits content/thoughts/<slug>.md
Public (/page/thoughts, /page/thoughts/[slug])
   └─> Server component → GitHub Contents API (ISR, revalidate 60s) → gray-matter → react-markdown
```

Three properties this buys you:

- **No database.** GitHub is the store; the repo is the backup; git history is the version history.
- **No redeploy to publish.** Public pages read via the GitHub API at request time with a 60s ISR cache, so a new post is live within a minute without a build.
- **Portable.** Every post is a plain `.md` file you can read, edit locally, or migrate elsewhere.

---

## 2. Storage format

Path: `content/thoughts/<slug>.md` (committed to `main`).

```markdown
---
title: "Why I stopped reading the news"
subtitle: "A short defence of ignorance"
date: "2026-08-01T10:22:00.000Z"
updated: "2026-08-01T10:22:00.000Z"
tags: ["politics", "media"]
featureImage: "https://ik.imagekit.io/<id>/thoughts/xyz.jpg"
excerpt: "Auto-generated from the first 160 chars if left blank."
status: "published"   # or "draft"
readingTime: 4
---

Body markdown here.
```

Drafts stay in the same folder with `status: draft`; the public listing filters them out, the editor dashboard shows them.

---

## 3. Authentication

You said "prompt alert login." I'd recommend a styled modal over `window.prompt()` for two reasons: `prompt()` can't mask the password field, and it can't hold a session, so you'd re-enter credentials on every action. The modal is roughly the same amount of code.

**Mechanism**

1. Credentials live in env vars. The password is stored as a **bcrypt hash**, not plaintext, so a leaked env file doesn't hand over the password directly.
2. `POST /api/thoughts/auth/login` compares with `bcrypt.compare`, then signs a JWT with `jose` (7-day expiry) and sets it as an `httpOnly`, `secure`, `sameSite=strict` cookie.
3. `middleware.ts` verifies the cookie on `/page/thoughts/write` and all mutating `/api/thoughts/*` routes. `jose` is used because it works in the Edge runtime where `jsonwebtoken` does not.
4. In-memory rate limit: 5 failed attempts per IP per 15 minutes. Not bulletproof across serverless instances, but it stops casual brute force.
5. Constant-time comparison on the username too, to avoid leaking whether the username is right.

**Threat model, stated plainly:** this protects a personal blog from strangers. It is not a hardened auth system, and the write route should never be linked from your nav.

---

## 4. Environment variables

Add to `.env` and `.env.sample`:

```bash
# Thoughts admin auth
THOUGHTS_ADMIN_USERNAME=""
THOUGHTS_ADMIN_PASSWORD_HASH=""   # bcrypt hash, generate with scripts/hash-password.mjs
THOUGHTS_JWT_SECRET=""            # 32+ random bytes: openssl rand -base64 32

# GitHub storage
GITHUB_TOKEN=""                   # fine-grained PAT, Contents: read+write, this repo only
GITHUB_OWNER="canaryGrapher"
GITHUB_REPO="portfolio-v3"
GITHUB_BRANCH="main"
GITHUB_CONTENT_PATH="content/thoughts"
```

`IMAGEKIT_*` vars already exist and get reused.

A small helper script `scripts/hash-password.mjs` generates the bcrypt hash so you never type the password into a config file.

---

## 5. GitHub API usage

| Operation | Endpoint | Notes |
|---|---|---|
| List posts | `GET /repos/{o}/{r}/contents/{path}` | Returns names + `sha` + `download_url` |
| Read post | `GET` on `download_url` (raw) | Cached with `next: { revalidate: 60 }` |
| Create/update | `PUT /repos/{o}/{r}/contents/{path}/{slug}.md` | Base64 body; `sha` required only on update |
| Delete | `DELETE` same path | Requires current `sha` |

Rate limit is 5,000 req/hr authenticated, which is far beyond anything a personal site will hit, and ISR collapses repeat traffic into one fetch per minute regardless.

Listing does one directory call plus N parallel raw fetches. If the post count ever passes ~50, swap the listing to a single GraphQL query, but that's a later optimisation, not a v1 concern.

---

## 6. File tree

Everything is kept small and single-purpose, matching the existing `app/components/pages/<page>/` convention.

```
content/thoughts/.gitkeep                      NEW  markdown lives here

app/interface/thoughts.ts                      NEW  ThoughtPost, ThoughtFrontmatter, ApiResult types

app/lib/thoughts/
  github.ts                                    NEW  low-level GitHub REST wrapper (get/put/delete/list)
  posts.ts                                     NEW  list/get/save/delete posts, gray-matter parse
  slug.ts                                      NEW  slugify + uniqueness check
  auth.ts                                      NEW  signToken / verifyToken / verifyCredentials
  reading-time.ts                              NEW  word-count estimate

app/api/thoughts/
  auth/login/route.ts                          NEW  POST  → sets cookie
  auth/logout/route.ts                         NEW  POST  → clears cookie
  auth/session/route.ts                        NEW  GET   → is the current cookie valid
  posts/route.ts                               NEW  GET list (admin, incl. drafts), POST create
  posts/[slug]/route.ts                        NEW  GET / PUT / DELETE one post
  upload/route.ts                              NEW  POST image → ImageKit → url

middleware.ts                                  NEW  guards /page/thoughts/write + write APIs

app/page/thoughts/
  page.tsx                                     NEW  public listing (server component, ISR)
  [slug]/page.tsx                              NEW  public post view + generateMetadata
  write/page.tsx                               NEW  gated editor shell (client)

app/components/pages/thoughts/
  index.ts                                     NEW  barrel
  ThoughtsHero.tsx                             NEW  page header, matches /page/blogs styling
  ThoughtCard.tsx                              NEW  listing card
  ThoughtsGrid.tsx                             NEW  grid + empty state
  TagFilter.tsx                                NEW  client-side tag filter chips
  MarkdownRenderer.tsx                         NEW  react-markdown + gfm + sanitize + highlight
  PostHeader.tsx                               NEW  title, subtitle, date, reading time, feature image
  editor/
    LoginModal.tsx                             NEW  username + password, error state
    EditorShell.tsx                            NEW  layout + save/publish orchestration
    EditorToolbar.tsx                          NEW  bold/italic/h2/link/code/quote/list buttons
    MarkdownInput.tsx                          NEW  textarea, tab handling, paste-image hook
    PreviewPane.tsx                            NEW  live render, reuses MarkdownRenderer
    FrontmatterForm.tsx                        NEW  title, subtitle, tags, excerpt, status
    FeatureImagePicker.tsx                     NEW  drag-drop → upload → preview
    PostList.tsx                               NEW  existing posts sidebar (edit / delete)
    useEditorState.ts                          NEW  hook: form state, dirty tracking, autosave draft
    useImageUpload.ts                          NEW  hook: upload + progress

app/components/layout/Header.tsx               EDIT add "Thoughts" nav link
next.config.ts                                 EDIT nothing needed (ik.imagekit.io already allowed)
.env.sample                                    EDIT new vars
scripts/hash-password.mjs                      NEW  one-off bcrypt hash generator
```

No file above should exceed ~150 lines.

---

## 7. Dependencies to add

```bash
pnpm add react-markdown remark-gfm rehype-sanitize rehype-highlight gray-matter jose bcryptjs
pnpm add -D @types/bcryptjs
```

Deliberately **not** adding: Octokit (plain `fetch` is ~40 lines and avoids a heavy dep), NextAuth (overkill for one user), a WYSIWYG editor library (you asked for raw markdown).

`rehype-sanitize` is non-optional even though you're the only author, because it also protects against anything odd in pasted content.

---

## 8. Editor UX

Split pane, markdown left, live preview right, collapsing to tabs on mobile.

- **Toolbar**: bold, italic, H2, H3, link, inline code, code block, quote, bullet list, image upload. Each wraps the current textarea selection.
- **Images**: drag-and-drop or paste directly into the editor → uploads to ImageKit `/thoughts` folder → inserts `![alt](url)` at the cursor. Feature image gets its own picker with a preview.
- **Frontmatter panel**: title (auto-generates slug, editable), subtitle, tags (chip input), excerpt (optional, auto-derived), status toggle.
- **Autosave**: draft state persisted to `localStorage` every few seconds so a browser crash doesn't lose the post. Cleared on successful publish.
- **Publish**: commits to GitHub, shows the resulting commit URL, redirects to the live post.
- **Post list**: sidebar of existing posts, click to load into the editor, delete with a confirm step.
- **Keyboard**: `Cmd+S` saves as draft, `Cmd+Enter` publishes.

---

## 9. Build order

| Phase | Deliverable | Verify by |
|---|---|---|
| 1 | Deps, env vars, types, `hash-password.mjs` | Script prints a valid bcrypt hash |
| 2 | `lib/thoughts/github.ts` + `posts.ts` | Node script writes and reads back a test `.md` in the repo |
| 3 | Auth lib, login/logout/session routes, `middleware.ts` | curl with and without a cookie; wrong password rejected and rate-limited |
| 4 | Post CRUD API routes + image upload route | curl create → check commit lands on GitHub; upload returns an ImageKit URL |
| 5 | Public listing + post page + MarkdownRenderer | Test post renders with images, code blocks, tables |
| 6 | Editor components + login modal | Write, upload an image, publish, confirm live in <60s |
| 7 | Nav link, SEO metadata, OG tags, RSS feed at `/page/thoughts/rss.xml` | Lighthouse pass, OG debugger |
| 8 | Verification pass | Build succeeds, XSS test payload sanitised, unauthed access to `/write` redirects, drafts absent from public listing |

Phases 1–4 are backend and testable entirely from curl before any UI exists, which is the right order because it means UI bugs and API bugs never get confused with each other.

---

## 10. Decisions worth flagging

**GitHub token scope.** Use a fine-grained PAT limited to this one repo with only Contents read/write. A classic token with `repo` scope would grant access to every repo you own, which is a much worse blast radius for a token sitting in a hosting provider's env panel.

**The write page is unlisted.** No nav link to `/page/thoughts/write`. Obscurity isn't security, but it keeps the route out of crawlers and casual view-source.

**Commits are attributed to the token owner.** Every post shows up as a commit in your repo history, which is a nice side effect: your git log becomes a publishing log.

**Politics and opinion content.** Nothing technical changes, but since these are personal-opinion posts under your professional portfolio, consider a short standing disclaimer in the page hero and separating the nav label clearly from your engineering blog, so a recruiter skimming `/page/blogs` doesn't land somewhere you didn't intend them to.

**What this doesn't do.** No comments, no search, no pagination, no scheduled publishing. All are addable later; none belong in v1.
