# File and Feature Map

This document explains **which functionality lives in which folder/file** so the portfolio can be edited, debugged, and extended manually in future sessions.

Related docs:
- [Documentation Index](../README.md)
- [Architecture Overview](system-overview.md)
- [Implementation Plan](../implementation-plans/portfolio-build-plan.md)

## Quick Orientation

Project root structure:

- `client/` — React frontend
- `server/` — Express backend API
- `docs/` — project memory, plans, architecture, and work logs

## Frontend Map

Frontend root:
- `client/src/`

### App entry and bootstrapping

#### `client/src/main.jsx`
Purpose:
- React application bootstrap
- mounts the app into the DOM

Edit here when:
- changing app boot logic
- adding providers in the future (router, global state, theme provider, etc.)

#### `client/src/App.jsx`
Purpose:
- top-level app wrapper
- currently renders the homepage directly

Edit here when:
- adding routing
- splitting the portfolio into multiple pages
- adding page-level wrappers

---

### Main page implementation

#### `client/src/pages/HomePage.jsx`
Purpose:
- primary public portfolio page
- contains most current UI sections and interactive logic

This is currently the most important frontend file.

Main functionality currently inside this file:
- hero section
- premium interactive `amit-profile.js` code card
- social/contact summary cards
- experience section
- Technical Ecosystem section
- projects section
- coding achievements section
- LeetCode activity heatmap
- education section
- contact form UI
- contact form submit logic
- live content API loading with fallback to local data

Important logic currently inside this file:
- hero card mouse interactions
- local contact form state
- contact form submit handler
- API fallback behavior for portfolio content
- skill logo/icon rendering
- social icon rendering
- heatmap rendering helpers

Edit here when:
- changing page layout
- changing section order
- changing copy presentation
- changing hero interactivity
- changing skill/heatmap visuals
- changing contact form UX

Debug here when:
- a homepage section looks broken
- hover effects do not work
- contact form status handling is wrong
- live content is not rendering as expected

Note:
- this file is large and would be a good candidate for future component extraction

---

### Shared layout components

#### `client/src/components/layout/Navbar.jsx`
Purpose:
- top navigation bar
- section anchor navigation
- brand badge and top CTA

Edit here when:
- changing navigation labels
- adding/removing top CTA
- changing sticky header behavior

#### `client/src/components/layout/Footer.jsx`
Purpose:
- bottom footer content
- portfolio closing identity block

Edit here when:
- changing footer text
- adding links
- adding copyright or social items

#### `client/src/components/layout/SectionShell.jsx`
Purpose:
- shared layout wrapper for page sections
- keeps spacing and section framing consistent

Edit here when:
- changing section outer spacing
- changing shared section width/padding patterns

---

### Shared UI primitives

#### `client/src/components/ui/Card.jsx`
Purpose:
- reusable premium card container
- shared card border, background, blur, and shadow styling
- now forwards additional props to support hover/mouse handlers

Edit here when:
- changing card surface style globally
- changing border radius/shadow globally
- adding reusable card behavior

Debug here when:
- mouse handlers on cards do not fire
- card-wide styling changes unexpectedly affect multiple sections

#### `client/src/components/ui/SectionHeading.jsx`
Purpose:
- shared section heading component
- consistent eyebrow/title/description block

Edit here when:
- changing section heading spacing or typography globally

---

### Frontend data and services

#### `client/src/data/portfolio.js`
Purpose:
- local seeded portfolio content
- fallback data source if backend content API is unavailable

Current content stored here:
- profile basics
- social links
- highlights
- hero metrics
- strengths
- skills
- experience
- projects
- coding achievements
- LeetCode heatmap data
- education

Edit here when:
- changing portfolio text quickly without touching backend
- changing fallback content
- updating seeded static values such as project metadata or heatmap stats

Debug here when:
- frontend shows old/local fallback content
- backend content is unavailable and you want to inspect what fallback is being used

#### `client/src/services/portfolioApi.js`
Purpose:
- fetches read-only portfolio content from backend

Current endpoint used:
- `GET /api/content`

Edit here when:
- changing frontend API base URL behavior
- changing content endpoint structure

Debug here when:
- homepage live content loading fails
- backend content route changes

#### `client/src/services/contactApi.js`
Purpose:
- sends contact form submissions to backend
- provides clearer network failure messaging

Current endpoint used:
- `POST /api/contact`

Edit here when:
- changing contact endpoint URL
- adding auth headers in the future
- improving client-side network error handling

Debug here when:
- contact form submission fails
- frontend points to wrong backend URL
- network errors are unclear

---

### Frontend public assets

#### `client/public/Amit_Yadav_Resume.pdf`
Purpose:
- downloadable resume asset

Used by:
- hero/contact download resume links

Edit here when:
- replacing resume with an updated PDF

#### `client/public/favicon.svg`
Purpose:
- site favicon

#### `client/public/icons.svg`
Purpose:
- shared icon asset file from initial setup
- review usage before changing or removing later

---

## Backend Map

Backend root:
- `server/src/`

### Backend entry and server boot

#### `server/src/server.js`
Purpose:
- backend server startup entry
- loads database connection before listening
- starts app on configured port

Edit here when:
- changing server startup behavior
- adding startup logs or shutdown handling

Debug here when:
- server does not start
- port binding behavior is wrong

#### `server/src/app.js`
Purpose:
- Express app configuration
- middleware setup
- CORS setup
- route mounting
- 404 JSON fallback

Current mounted routes:
- `/api/health`
- `/api/content`
- `/api/contact`

Edit here when:
- changing CORS behavior
- adding global middleware
- mounting new route groups

Debug here when:
- requests fail before reaching controllers
- CORS errors happen
- route mounting is wrong

---

### Backend configuration

#### `server/src/config/env.js`
Purpose:
- reads environment variables
- defines defaults for node env, port, MongoDB URI, and client URL

Edit here when:
- adding new env config values
- changing defaults

#### `server/src/config/db.js`
Purpose:
- MongoDB connection helper
- exposes database connection state helper

Main exports:
- `connectDatabase()`
- `isDatabaseConnected()`

Edit here when:
- changing database connection behavior
- adding retry logic
- improving logging

Debug here when:
- MongoDB does not connect
- API falls back to temporary/in-memory behavior unexpectedly

---

### Backend routes

#### `server/src/routes/contentRoutes.js`
Purpose:
- public read-only portfolio content routes

Current routes:
- `GET /api/content`
- `GET /api/content/profile`
- `GET /api/content/skills`
- `GET /api/content/experience`
- `GET /api/content/projects`
- `GET /api/content/education`
- `GET /api/content/coding-achievements`

Edit here when:
- adding new public content endpoints
- changing route naming

#### `server/src/routes/contactRoutes.js`
Purpose:
- contact form routes

Current routes:
- `POST /api/contact`
- `GET /api/contact/temporary-messages`

Edit here when:
- adding admin review routes
- changing contact endpoint structure

Debug here when:
- frontend contact form cannot submit
- temporary message inspection is needed

---

### Backend controllers

#### `server/src/controllers/contentController.js`
Purpose:
- returns seeded portfolio content through API responses

Current handlers:
- `getProfile`
- `getSkills`
- `getExperience`
- `getProjects`
- `getEducation`
- `getCodingAchievements`
- `getPortfolioContent`

Edit here when:
- changing content response shape
- switching from seeded data to database queries

Debug here when:
- frontend content section receives wrong JSON

#### `server/src/controllers/contactController.js`
Purpose:
- handles contact form submission
- stores data in MongoDB if connected
- falls back to in-memory storage if DB-backed persistence is unavailable

Current handlers:
- `createContactMessage`
- `getTemporaryMessages`

Edit here when:
- adding email sending
- adding admin workflow
- changing storage behavior

Debug here when:
- contact messages do not save
- temporary storage mode is unexpectedly used
- response payloads need inspection

---

### Backend middleware

#### `server/src/middleware/validateContactRequest.js`
Purpose:
- validates and sanitizes contact form input before controller logic runs

Current checks:
- name required
- email required and valid
- subject max length
- message required
- message minimum and maximum length

Edit here when:
- changing form rules
- adding stricter validation

Debug here when:
- contact form returns validation errors
- sanitized payload shape needs review

---

### Backend models

These are the current Mongoose models and planned persistence shapes.

#### `server/src/models/Profile.js`
Purpose:
- profile information model

#### `server/src/models/Project.js`
Purpose:
- project information model

#### `server/src/models/Skill.js`
Purpose:
- skill category model

#### `server/src/models/Experience.js`
Purpose:
- experience entry model

#### `server/src/models/Education.js`
Purpose:
- education entry model

#### `server/src/models/CodingAchievement.js`
Purpose:
- coding achievement summary model

#### `server/src/models/ContactMessage.js`
Purpose:
- contact form submission model

Edit these files when:
- changing schema fields
- adding validation at model level
- moving more frontend content into MongoDB

Debug these files when:
- Mongo save/query behavior is wrong
- stored document shape is wrong

---

### Backend seeded content

#### `server/src/data/portfolioContent.js`
Purpose:
- backend-side seeded content source for public portfolio APIs

Stores:
- profile
- skills
- experience
- projects
- education
- coding achievements

Edit here when:
- changing backend fallback/read-only content
- testing content API changes without database dependency

Debug here when:
- frontend API content differs from expected backend seed values

---

## Docs Map

#### `docs/README.md`
Purpose:
- docs index and navigation entry point

#### `docs/implementation-plans/portfolio-build-plan.md`
Purpose:
- phased implementation checklist and current priority

#### `docs/architecture/system-overview.md`
Purpose:
- high-level system design and architecture notes

#### `docs/architecture/file-and-feature-map.md`
Purpose:
- this file; feature-to-file editing/debugging map

#### `docs/work-log/2026-05-30-project-initialization.md`
Purpose:
- session/project progress log

#### `docs/session-handoffs/latest.md`
Purpose:
- pointer to current handoff for future continuity

---

## Fast Edit Guide

If you want to change something quickly, start here:

- change hero/about/projects/contact layout:
  - `client/src/pages/HomePage.jsx`
- change navbar:
  - `client/src/components/layout/Navbar.jsx`
- change footer:
  - `client/src/components/layout/Footer.jsx`
- change all card styling:
  - `client/src/components/ui/Card.jsx`
- change section heading style:
  - `client/src/components/ui/SectionHeading.jsx`
- change local portfolio content:
  - `client/src/data/portfolio.js`
- change contact API client behavior:
  - `client/src/services/contactApi.js`
- change content API client behavior:
  - `client/src/services/portfolioApi.js`
- change downloadable resume file:
  - `client/public/Amit_Yadav_Resume.pdf`
- change backend CORS / route mounting:
  - `server/src/app.js`
- change backend startup/port behavior:
  - `server/src/server.js`
- change backend env defaults:
  - `server/src/config/env.js`
- change DB connection behavior:
  - `server/src/config/db.js`
- change contact form validation:
  - `server/src/middleware/validateContactRequest.js`
- change contact save behavior:
  - `server/src/controllers/contactController.js`
- change public content API payloads:
  - `server/src/controllers/contentController.js`
- change backend seeded content:
  - `server/src/data/portfolioContent.js`

---

## Recommended Future Refactor

To make manual maintenance easier later, the best next cleanup would be:
- split `client/src/pages/HomePage.jsx` into dedicated components such as:
  - Hero section
  - Technical Ecosystem section
  - Projects section
  - Coding Achievements / Heatmap section
  - Contact section

That is not required immediately, but it would reduce debugging complexity significantly as the portfolio grows.
