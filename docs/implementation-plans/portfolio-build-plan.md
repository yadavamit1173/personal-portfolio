# Portfolio Build Plan

## Overview

This plan defines the phased implementation path for building Amit Kumar Yadav's premium MERN portfolio in a professional, scalable, and documentation-driven manner.

Related docs:
- [Documentation Index](../README.md)
- [Project Rules](../project-rules.md)
- [Product Requirements](../product-requirements.md)
- [Architecture Overview](../architecture/system-overview.md)

## Build Strategy

The project should be implemented in phases so that each stage leaves the repository in a coherent, testable, and extensible state.

## Phase 1 — Foundation and Planning

### Goals
- Establish documentation and working rules
- Define architecture and product scope
- Prepare repository structure for implementation

### Checklist
- [x] Create root project README
- [x] Create docs index
- [x] Create project rules
- [x] Create product requirements
- [x] Create implementation plan
- [x] Create architecture overview
- [x] Create work log entry
- [x] Create session handoff
- [x] Create latest handoff pointer
- [x] Initialize `client/` and `server/` directories

## Phase 2 — Frontend Foundation

### Goals
- Scaffold React + Vite app
- Configure Tailwind CSS
- Build layout primitives and theme tokens
- Establish reusable section and card patterns

### Checklist
- [x] Create `client/` with Vite
- [x] Configure Tailwind CSS
- [x] Set up folder structure for components, pages, assets, hooks, data, utils
- [x] Add global styles and design tokens
- [x] Create shared layout components
- [x] Create navigation and footer

## Phase 3 — Portfolio UI Build

### Goals
- Implement the core public portfolio experience
- Use professional copy and structured storytelling

### Checklist
- [x] Hero section
- [x] About section
- [x] Skills section
- [x] Experience timeline
- [x] Projects showcase
- [x] Education section
- [x] Coding achievements section
- [x] Contact section
- [ ] Responsive review of all public sections

## Phase 4 — Backend Foundation

### Goals
- Create Express server
- Connect MongoDB
- Prepare models and API routes for future dynamic content

### Checklist
- [x] Create `server/` structure
- [x] Add Express app setup
- [x] Add environment config
- [ ] Add MongoDB connection utility
- [ ] Define initial data models
- [x] Add health and basic content routes
- [ ] Add validation strategy

## Phase 5 — Dynamic Content and Contact Flow

### Goals
- Move selected portfolio content into backend-driven structures
- Enable contact form submission

### Checklist
- [ ] Create content schemas for profile, projects, skills, experience, education
- [ ] Create message/contact schema
- [ ] Build REST endpoints for public content
- [ ] Build contact submission endpoint
- [ ] Connect frontend contact form to backend
- [ ] Add success and error states

## Phase 6 — Advanced Features

### Goals
- Add private admin-ready foundations and richer portfolio capability

### Checklist
- [ ] Add auth model and admin login foundations
- [ ] Plan dashboard routes and protected API patterns
- [ ] Add project detail pages
- [ ] Add resume asset handling
- [ ] Add SEO metadata and social sharing support

## Phase 7 — Quality and Launch Readiness

### Goals
- Polish, validate, and prepare for deployment

### Checklist
- [ ] Accessibility review
- [ ] Performance review
- [ ] Final responsive review
- [ ] Content proofreading
- [ ] Deployment documentation
- [ ] Environment setup documentation

## Current Priority

Refine the public portfolio experience with responsive polish, real project links/assets when available, and stronger visual differentiation between sections. After that, add the MongoDB connection utility on the backend so the project is ready for API-driven content in the next phase.
