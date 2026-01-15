# NextJS + Elysia Turborepo

> A production-ready, full-stack boilerplate combining Next.js frontend with Elysia backend in a monorepo architecture. Start building modern web applications with authentication, internationalization, and type-safe APIs out of the box.

## ✨ Overview

This boilerplate provides a comprehensive foundation for building full-stack applications with:

- **Next.js 14+** - React framework with App Router
- **Elysia** - Fast, type-safe Bun/Node.js web framework
- **Turborepo** - High-performance build system for monorepos
- **Type Safety** - End-to-end type safety from database to frontend
- **Modern Stack** - Drizzle ORM, TanStack Query, Mantine UI, Better Auth

Perfect for developers who want to skip the setup and focus on building features.

## 🚀 Quick Start

```bash
# Clone the repository
git clone [https://github.com/hoaaq/nextjs-elysia-turborepo.git](https://github.com/hoaaq/nextjs-elysia-turborepo.git)
cd nextjs-elysia-turbo

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env

# Run the development server
pnpm dev
```

## 🎯 Key Features

### 🎨 **UI & Components (Mantine)**

- ✅ Protected and unprotected AppShell layouts
- ✅ Zero-config Breadcrumbs component
- ✅ Theme switcher (ThemeSegmentor)
- ✅ Notification system hook
- ✅ Form validation and error message handling

### 🌍 **Internationalization (Next-intl)**

- ✅ Pre-configured for Vietnamese and English
- ✅ Automatic language integration with Mantine Dates
- ✅ Locale switcher component
- ✅ Server and client-side i18n support

### 🔄 **Data Fetching (TanStack Query)**

- ✅ Hybrid fetching (Next.js streaming + client-side queries)
- ✅ URL query params state management (Nuqs)
- ✅ Multi-query invalidation utilities
- ✅ Optimized caching strategies

### ⚡ **Backend (Elysia)**

- ✅ Runs seamlessly on Next.js API routes
- ✅ Modular architecture (easy to extract as standalone server)
- ✅ Drizzle ORM with Turborepo separation
- ✅ End-to-end type safety with Eden Treaty
- ✅ Auto-generated Swagger/OpenAPI documentation
- ✅ CORS pre-configured
- ✅ Email service (Nodemailer local / Resend production)

### 🔐 **Authentication (Better Auth)**

- ✅ Email/password and social auth (Google, Facebook, GitHub)
- ✅ Works on both Elysia backend and Next.js client
- ✅ Email templates (verification, password reset)
- ✅ Authentication middleware for protected routes
- ✅ Pre-built auth components (sign-in, sign-up, user settings,...)
- 🔜 User management dashboard
- 🔜 Role-Based Access Control (RBAC)
- 🔜 Access control enforcement utilities

## 📁 Project Structure

```
nextjs-elysia-turbo/
├── apps/
│   └── web/              # Next.js application
├── packages/
│   ├── server/           # Elysia backend logic
│   ├── db/               # Database schema & migrations
│   └── config/           # Shared TypeScript configs
└── turbo.json            # Turborepo configuration
```

## 🛠️ Tech Stack

- **Frontend**: Next.js, React, TypeScript, Mantine UI
- **Backend**: Elysia, Bun/Node.js
- **Database**: Drizzle ORM
- **Auth**: Better Auth
- **Query**: TanStack Query, Nuqs
- **i18n**: next-intl
- **Email**: React Email, Nodemailer, Resend
- **Build**: Turborepo, pnpm

## 📋 Roadmap

- [ ] User management dashboard
- [ ] Dynamic RBAC components
- [ ] Access control enforcement utilities

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.




