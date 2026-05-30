# System Overview

## Purpose

This document describes the high-level architecture for the **Personal Portfolio** project and serves as the reference point for technical structure decisions.

Related docs:
- [Documentation Index](../README.md)
- [Project Rules](../project-rules.md)
- [Product Requirements](../product-requirements.md)
- [Implementation Plan](../implementation-plans/portfolio-build-plan.md)

## 1. Architecture Summary

The project will follow a split **MERN** architecture:
- **React + Vite** frontend in `client/`
- **Node.js + Express.js** backend in `server/`
- **MongoDB** for structured content and contact persistence

This architecture supports a polished public portfolio now and dynamic/admin-driven capabilities later.

## 2. High-Level Goals

- Deliver a professional and responsive portfolio experience
- Keep the frontend modular and reusable
- Keep backend APIs clean and extensible
- Allow future migration from static seeded content to fully managed content
- Support future admin authentication and content operations without major restructuring

## 3. Repository Structure

Planned structure:

```text
personal-portfolio/
├── client/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── data/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── ...
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── app.js
│   └── ...
├── docs/
└── README.md
```

## 4. Frontend Architecture

### Responsibilities
- Render the public portfolio experience
- Consume backend content APIs in future phases
- Organize UI into reusable presentational and section-level components
- Deliver responsive and polished interaction design

### Initial Frontend Areas
- layout shell
- navigation
- hero
- about
- experience timeline
- skills grid
- projects showcase
- education section
- achievements section
- contact section

## 5. Backend Architecture

### Responsibilities
- Serve structured portfolio content
- Accept and store contact messages
- Support future admin authentication and content editing
- Encapsulate database interactions cleanly

### Initial API Areas
- `GET /api/health`
- `GET /api/profile`
- `GET /api/projects`
- `GET /api/skills`
- `GET /api/experience`
- `GET /api/education`
- `POST /api/contact`

## 6. Data Model Direction

Planned collections/models:
- `Profile`
- `Project`
- `Skill`
- `Experience`
- `Education`
- `ContactMessage`
- `AdminUser` (future)
- `SiteConfig` (future)

## 7. Content Strategy

### Version 1
Content may be represented initially as local structured seed data for speed, but should follow shapes compatible with future backend models.

### Version 2
Content should be served from MongoDB-backed APIs and eventually maintained through protected admin workflows.

## 8. Security Direction

Future backend and admin design should account for:
- JWT-based authentication
- secure cookies where appropriate
- validation and sanitization
- rate limiting for public endpoints
- safe contact form handling

## 9. Styling and UX Direction

The UI should emphasize:
- dark premium design
- developer-focused visual language
- strong hierarchy and readability
- mobile-first responsive layout
- subtle motion and polished interactivity

## 10. Current Status

Architecture is defined conceptually. The repository is still awaiting initialization of the `client/` and `server/` applications.
