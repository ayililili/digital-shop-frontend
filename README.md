# 🛍️ Digital Product Shop (Frontend)

This project is a **prototype digital product shop** built with **React**,
**Vite**, and **Firebase**. It demonstrates Google login using Firebase
Authentication.

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

   **Note:** Missing `.env` values will cause the app to fail.

3. Start the dev server

   ```bash
   npm run dev
   ```

4. Build for production

   ```bash
   npm run build
   ```

## Routing

This project uses **React Router DOM** for navigation. Routes for the **Home**,
**Login**, and **Product** pages are configured in `src/App.tsx` and implemented
under `src/pages/*`.
