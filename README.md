# 🛍️ Digital Product Shop (Frontend)

Simple React + Firebase example built with Vite. It demonstrates Google login
using Firebase Authentication.

## Prerequisites

- Node.js 18+
- npm or pnpm

## Getting Started

1. Install dependencies

   ```bash
   npm install
   ```

2. Copy the `.env.example` file and fill in your Firebase credentials

   ```bash
   cp .env.example .env
   # edit .env with your values
   ```

3. Start the dev server

   ```bash
   npm run dev
   ```

4. Build for production

   ```bash
   npm run build
   ```

## Routing

This project uses **React Router DOM** for navigation. The routes are
configured in `src/App.tsx`, and the corresponding page components live in
`src/pages`. Use the navigation links at the top of the app to switch between
the Home, Login and Product pages.
