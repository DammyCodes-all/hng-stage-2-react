# TicketFlow (React Implementation)

TicketFlow is a demo ticket management application built with React, TypeScript, and Vite. It delivers the landing page, authentication flow, dashboard, and ticket CRUD experience defined in the multi-framework brief.

> This repository currently hosts the **React** implementation. Vue.js and Twig ports will live in sibling repositories and be linked here when available.

## Tech Stack

- React 19 + TypeScript
- Vite (rolldown build) for bundling and dev server
- Tailwind CSS 4 for utility styling
- shadcn/ui components (button, input, dialog, alert dialog, select, card)
- Lucide icons
- Sonner for toast notifications

## Key Features

- Responsive landing page with hero wave SVG, decorative circles, feature boxes, and global footer
- LocalStorage-backed authentication (login/signup/logout) with inline validation and toast feedback
- Protected routes enforced by context + router guard
- Dashboard with ticket stats and recent activity cards
- Ticket management page with create, read, update, delete workflows
- Dialog-driven forms with real-time validation and accessible labeling

## Project Structure

```
src/
  components/
    context/        Auth and Ticket providers
    Navbar.tsx      Responsive navigation with session-aware links
    Footer.tsx      Shared footer
    TicketCard.tsx  Ticket display card with status chip
    TicketDialog.tsx CRUD dialog with form validation
    circle.tsx      Decorative background circle helper
  pages/
    Home.tsx        Landing page
    AuthPage.tsx    Login/Signup form (mode toggled)
    Dashboard.tsx   Overview and quick actions
    Tickets.tsx     Ticket CRUD screen
  App.tsx           Routing + providers + protected route wrapper
  main.tsx          App bootstrap with BrowserRouter
```

## Getting Started

```powershell
# install dependencies
npm install

# run the development server
npm run dev

# build for production
npm run build

# preview the production build
npm run preview
```

The dev server defaults to http://localhost:5173/.

### Switching Between Implementations

- React: this repository.
- Vue.js / Twig: not yet published. Once ready, links and instructions will appear here.

## Authentication & State

- `AuthContext` stores the active user and registered users in `localStorage` under `ticketapp_user` and `ticketapp_session`.
- `TicketContext` manages ticket state in memory seeded with mock data. CRUD operations update the context and drive the UI.
- Protected routes live in `App.tsx`; unauthenticated access triggers a toast and redirect to `/auth/login`.

### Demo Credentials

- Email: `demo@ticketflow.dev`
- Password: `password123`

> Sign-up also works—accounts created via the form persist in `localStorage`.

## Accessibility Notes

- Semantic HTML with clear headings, sections, and button elements.
- Form controls are paired with `<Label>` components and inline error messages.
- Focus states inherit from shadcn/ui, ensuring visible outlines.
- Decorative elements (wave SVG, circles) are non-interactive and marked with `aria-hidden` where applicable.
- Status badges combine color with text labels to avoid color-only meaning.

Known improvements:

- No skip-link or landmark navigation yet.
- Toast notifications rely on Sonner's built-in ARIA handling; independent verification is pending.

## Error Handling

- Forms validate required fields and minimum password length before submission.
- Auth failures (duplicate email, incorrect credentials) surface descriptive toast errors.
- Ticket dialogs enforce required title/description and restrict status to `open`, `in_progress`, or `closed`.
- Protected route guard redirects unauthorized users and displays a “Please login” toast.

## Known Issues / TODOs

- Update logout flow to navigate back to `/` per requirement.
- Publish Vue.js and Twig versions, then link them here.
- Persist tickets via storage or API mock if longer-lived data is desired.

## License

Project prepared for the HNG Stage 2 task. No explicit license at this time.
