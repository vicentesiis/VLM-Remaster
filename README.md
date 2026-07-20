# NorthEntry

> A CRM platform designed for visa and immigration agencies — helping sales agents track prospects, manage the sales pipeline, and close clients through structured service plans.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Architecture & Data Flow](#architecture--data-flow)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing & Code Style](#contributing--code-style)
- [Roadmap](#roadmap)
- [License](#license)

---

## Overview

**NorthEntry** is a web-based CRM built for immigration consulting firms and visa agencies. It centralises the entire client journey — from initial contact (prospect) to qualified lead, and finally to paid client — while providing sales agents, team leaders, and administrators with the tools they need to track performance, manage records, and close deals.

The platform organises visa advisory services into tiered **Program A / B / C** plans with multi-currency pricing and live exchange rates. With role-based dashboards, rich reporting, and task management, NorthEntry helps agencies scale their operations and make data-driven decisions.

## Features

- **Pipeline Management** — Track prospects, leads, and clients through every stage with customisable statuses (new contact, in progress, approved, rejected, finalised, etc.).
- **Role‑Based Access** — Four distinct roles: *Super Admin*, *Admin*, *Team Leader*, and *Agent*, each with tailored views and permissions.
- **Program Plans & Multi‑Currency Pricing** — Structured visa advisory plans (A, B, C) with USD base pricing and automatic local-currency conversion via live exchange rates.
- **Real‑Time Dashboards** — KPI cards, individual and group performance summaries, top-seller rankings, and goal-progress tracking.
- **Comprehensive Reports** — Sales by agent, monthly sales, active receivables, potential sales, global sales, agent cut reports, and sales-by-channel reports.
- **Task Management** — Agents and leaders can manage assigned tasks linked to records and sales activities.
- **Job Vacancies (Vacantes)** — Browse and manage job openings tied to visa sponsorship opportunities.
- **User & Account Administration** — Manage users, groups, accounts, and team structure from a settings panel.
- **Theme Support** — Light and dark mode via `next-themes`.

## Tech Stack

| Layer | Technology |
| --- | --- |
| **Language / Runtime** | JavaScript (JSX) / TypeScript, Node.js |
| **Framework** | React 18 (Vite) |
| **Styling** | Tailwind CSS 3 + `tailwindcss-animate` |
| **UI Primitives** | Radix UI (dialog, dropdown, select, tabs, accordion, tooltip, etc.) |
| **Icons** | Lucide React, React Icons, Radix Icons |
| **Routing** | React Router DOM v7 |
| **State Management** | Zustand, React Query (TanStack Query v5) |
| **Tables** | TanStack React Table v8 |
| **Charts** | Recharts |
| **Forms** | React Hook Form + Zod (validation) |
| **HTTP Client** | Axios |
| **Utilities** | date-fns, clsx, class-variance-authority, tailwind-merge, immer |
| **Notifications** | Sonner (toasts) |
| **Build Tooling** | Vite, ESLint, Prettier, PostCSS

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [pnpm](https://pnpm.io/) (package manager used by this project)

### Installation

```bash
git clone https://github.com/vicentesiis/VLM-Remaster.git
cd VLM-Remaster
pnpm install
```

### Running locally

```bash
pnpm dev
```

The dev server starts at `http://localhost:5173`.

### Building for production

```bash
pnpm build    # outputs to dist/
pnpm preview  # preview the production build locally
```

## Environment Variables

<!-- Add env variables as needed -->

| Variable | Required | Description |
| --- | --- | --- |
| `VITE_API_BASE_URL` | Yes | Base URL for the backend API |

## Available Scripts

| Script | Description |
| --- | --- |
| `pnpm dev` | Start the Vite development server with HMR. |
| `pnpm build` | Build the app for production under `dist/`. |
| `pnpm preview` | Serve the production build locally for testing. |
| `pnpm lint` | Run ESLint across the codebase. |
| `pnpm start` | Serve the built app using `serve` (for production hosting). |

## Project Structure

```
src/
├── assets/          # Static assets (images, logos)
├── components/
│   ├── admin-panel/ # Shell layout: sidebar, navbar, footer
│   ├── customs/     # Domain-specific components (forms, cards, layouts)
│   └── ui/          # Reusable UI primitives (button, dialog, table, etc.)
├── config/          # App & table configuration
├── constants/       # Roles, statuses, currencies, job categories
├── context/         # React context providers (auth, etc.)
├── data/            # Static data: navbar config, menu definitions
├── forms/           # Form field definitions and validators
├── hooks/           # Shared React hooks
├── mocks/           # API mock handlers (MSW/Axios adapters)
├── pages/
│   ├── login/       # Authentication page
│   └── main/        # Authenticated pages (dashboard, records, reports, etc.)
├── routes/          # Route definitions, guards, and role-based protection
├── services/        # API service layer (auth, documents)
├── styles/          # Global CSS and animation styles
└── utils/           # Helpers: formatting, localStorage, charts, sidebar
```

## Configuration

<!-- Any config files, feature flags, or settings users may need to change. -->

## Architecture & Data Flow

<!-- Optional: high-level diagram or explanation of how the pieces fit together. -->

## Testing

<!-- How to run the tests and what is covered. -->

```bash
<test-command>
```

## Deployment

<!-- How and where the project is deployed, plus any required steps. -->

## Contributing & Code Style

<!-- Conventions, linting/formatting, branch/PR workflow, and how to contribute. -->

## Roadmap

<!-- Planned features, known limitations, or future improvements. -->

## License

<!-- e.g. MIT, Apache-2.0, or "Private / All rights reserved". -->
