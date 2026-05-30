# Project Rules

This document defines the working rules for building and maintaining the **Personal Portfolio** project.

## 1. Product Direction

- The project is a premium personal developer portfolio for **Amit Kumar Yadav**.
- It should be inspired by modern developer portfolios, especially the referenced dark professional style, but must remain original.
- The result should feel more advanced, polished, and production-ready than a static clone.
- The portfolio should reflect real engineering credibility, not just visual styling.

## 2. Technical Rules

### Architecture
- Use a MERN architecture:
  - **MongoDB** for data persistence
  - **Express.js** for APIs
  - **React** for frontend UI
  - **Node.js** for backend runtime
- Prefer a split structure with `client/` and `server/` directories.
- Frontend and backend should remain modular and independently maintainable.

### Frontend Rules
- Use React with Vite.
- Use Tailwind CSS for styling.
- Use reusable components and clear folder organization.
- Maintain responsive design from the beginning.
- Use smooth animation sparingly and professionally.
- Avoid visual clutter, inconsistent spacing, or excessive effects.

### Backend Rules
- Use Express.js with clean route/controller/service separation where appropriate.
- Use Mongoose for MongoDB models.
- Validate request input.
- Keep API naming clear and REST-oriented.
- Build with future admin dashboard support in mind.

## 3. Design Rules

- Default theme should be **dark, modern, and developer-focused**.
- The UI should feel premium and professional.
- Prioritize readability, hierarchy, spacing, and strong typography.
- Avoid copying the reference portfolio literally.
- Introduce stronger interaction design, better storytelling, and more structured content presentation.

### Design Characteristics
- Dark theme with subtle accent color(s)
- Clean cards and sections
- Professional code-inspired visual language where useful
- Strong project presentation
- Smooth transitions and polished section flow

## 4. Content Rules

- Use the user-provided CV and links as the source of truth unless corrected later.
- Do not invent experience, achievements, or project claims.
- If content is missing, mark it as pending rather than fabricating it.
- Rewrite user content into professional, recruiter-friendly, portfolio-appropriate language.

### Current Known Source Data
- **Name:** Amit Kumar Yadav
- **Email:** amityadav422v@gmail.com
- **Phone:** 8303611700
- **GitHub:** https://github.com/yadavamit1173
- **LinkedIn:** https://www.linkedin.com/in/amit-kumar-yadav-949b13190/
- **LeetCode:** https://leetcode.com/u/amit_808/
- **Theme Preference:** dark

## 5. Documentation Rules

- Document substantial decisions before or during implementation.
- Keep all major plans, architecture notes, and session continuity docs inside `docs/`.
- Maintain concise but actionable documentation.
- Update documentation when architecture, scope, or priorities change.
- Keep `docs/README.md` as the main documentation index.

## 6. Engineering Quality Rules

- Prefer clarity over cleverness.
- Keep components reusable and files well named.
- Match implementation quality to production-oriented expectations.
- Validate meaningful changes with focused checks where possible.
- Do not claim implementation or validation that has not actually been completed.

## 7. Portfolio Experience Goals

The finished portfolio should communicate:
- strong MERN engineering capability
- professional work experience
- scalable backend and frontend skills
- payment-system and AWS credibility
- problem-solving ability
- polished product thinking

## 8. Launch Priorities

### Version 1 Priorities
- professional homepage
- hero section
- about section
- skills section
- experience timeline
- project showcase
- education section
- coding achievements section
- contact section

### Version 2 Priorities
- dynamic backend-driven content
- admin dashboard
- blog/content management
- contact submission storage
- project detail pages
- resume and asset management

## 9. Working Principle

Each implementation step should improve one or more of the following:
- professionalism
- maintainability
- clarity
- user experience
- technical credibility
