# SubTrack-Subscription Dashboard

ICT 930 Advanced Web Application Development-Assignment 2

## Project Overview

SubTrack is a subscription management web application built with React, TypeScript, and Vite. It allows users to add, edit, delete, and monitor personal or business subscriptions across categories such as streaming, software, cloud services, education, and health.

The application displays a live dashboard with total monthly spending, active service counts, a yearly cost projection, and a category breakdown. Users can search and filter their subscriptions, toggle services between active and inactive, and manage all data through a validated form. All data is stored in the browser using localStorage, so subscriptions persist between sessions without requiring a backend or server connection.

---

## Technology Stack

| Technology | Purpose |
|---|---|
| React 19 | UI library using functional components and hooks |
| TypeScript | Static typing for all components, context, and data models |
| Vite 8 | Fast build tool and local development server |
| React Router v7 | Client-side routing between pages |
| Tailwind CSS v4 | Utility-first CSS framework using the new Vite plugin approach |
| Context API | Global state management for service data |
| localStorage | Browser-based data persistence |

---

## Installation Instructions

Make sure you have **Node.js version 18 or higher** installed before starting.

**Step 1 — Clone or extract the project**

If you received a ZIP file, extract it to a folder of your choice. If you have the GitHub link, run:

```bash
git clone <repository-url>
```

**Step 2 — Install dependencies**

```bash
cd subscription-dashboard
npm install
```

**Step 3 — Run the development server**

```bash
npm run dev
```

Then open your browser and go to: `http://localhost:5173`

**Step 4 — Build for production (optional)**

```bash
npm run build
```

---

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          — sticky top navigation bar
│   │   └── Layout.tsx          — page wrapper with toast support
│   ├── ui/
│   │   ├── Icons.tsx           — all SVG icons used across the app
│   │   ├── DashboardCard.tsx   — reusable summary stat card
│   │   ├── ServiceCard.tsx     — individual subscription card
│   │   ├── Badge.tsx           — category and status labels
│   │   ├── Modal.tsx           — delete confirmation dialog
│   │   ├── Toast.tsx           — slide-up action notification
│   │   └── LoadingSpinner.tsx  — loading state indicator
│   └── features/
│       ├── ServiceForm.tsx     — add/edit form with validation
│       └── FilterBar.tsx       — search input and filter buttons
├── context/
│   └── ServiceContext.tsx      — global state, actions, derived values
├── data/
│   └── mockServices.ts         — TypeScript types and sample data
├── pages/
│   ├── Dashboard.tsx           — summary view with stats and recent services
│   ├── Services.tsx            — full list with search and filter
│   ├── AddService.tsx          — form page for new subscriptions
│   └── EditService.tsx         — pre-filled form for editing a service
├── App.tsx                     — router setup and provider tree
├── main.tsx                    — application entry point
├── vite-env.d.ts               — Vite type declarations for TypeScript
└── index.css                   — global styles and Tailwind v4 theme tokens
```

---

## Key Features

- Dashboard with four summary cards: monthly spend, active count, paused count, and number of categories
- Yearly cost projection card showing estimated annual spend based on active services
- Category breakdown with proportional progress bars for each subscription type
- All Services page with real-time search and a segmented filter control: All, Active, and Inactive
- Add Service form with full validation — required fields, price format checking, category selection, billing cycle, start date, and status toggle
- Edit Service — same validated form pre-filled with the existing service data, accessible from each card
- Delete Service — removes a subscription after a confirmation modal with a warning icon
- Toggle status — pause or reactivate any subscription with a single button press
- Service initial avatar — a letter badge generated from the service name
- Toast notifications — slide-up feedback after every user action with SVG icons
- Error state on the edit page — shown when a service ID in the URL does not match any stored service
- Loading state — animated SVG spinner shown while data loads on first visit
- Empty states — clear prompts shown when no services exist or no search results are found
- localStorage persistence — data is saved in the browser and survives page refreshes
- Responsive layout — fully usable on mobile and desktop screens

---

## Design Decisions

A clean, light colour scheme was chosen to make the interface feel approachable and easy to read for all users. The background uses a soft off-white tone with white cards, light borders, and subtle shadows to create visual depth without adding noise. The primary accent colour is emerald green, used for active states, primary buttons, progress bars, and the status indicator dot. Rose red is reserved for delete actions and error states. Amber is used for warnings and paused service indicators. Sky blue is used specifically for edit actions. Each colour carries a consistent meaning throughout the entire interface so users can quickly understand what a button will do.

All icons across the application are inline SVGs stored in a single Icons.tsx file. This approach avoids adding an icon library dependency, keeps the bundle small, and ensures every icon matches the same stroke weight and visual style. No emoji are used anywhere in the interface.

Tailwind CSS v4 was used with the new @tailwindcss/vite plugin, which means there is no separate tailwind.config.js file. Custom theme tokens such as font families are declared using the @theme block directly inside index.css.

TypeScript was applied throughout the project. All component props, context values, form state, and data shapes are explicitly typed. This catches errors during development rather than at runtime and makes the codebase easier to follow.

Context API was chosen over external libraries such as Redux or Zustand because the application state is a single list of services with a small number of actions. Derived values such as totalMonthlyCost, activeServices, and categoryCounts are computed inside the context so that page components only need to read values and call functions.

Playfair Display is used for all headings and large numbers to give the dashboard a polished feel. DM Sans is used for body text, labels, and UI elements.
