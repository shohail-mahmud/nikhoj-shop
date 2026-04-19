# Nikhoj Shop

A modern e-commerce platform built with React, TypeScript, and Supabase.

## live Demo 

https://nikhoj-shop.vercel.app/

## Features

- 🛍️ **Product Catalog** - Browse paintings, t-shirts, and custom products
- 🔐 **Authentication** - Secure user login and registration
- 👤 **Admin Dashboard** - Manage products, categories, reviews, and team members
- 📱 **Responsive Design** - Optimized for all devices
- 🎨 **Beautiful UI** - Built with shadcn/ui and Tailwind CSS

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Supabase (Database, Auth, Storage)
- **State Management**: TanStack React Query
- **Routing**: React Router v6

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or bun

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── ui/          # shadcn/ui components
│   └── admin/       # Admin-specific components
├── contexts/        # React context providers
├── hooks/           # Custom React hooks
├── integrations/    # Third-party integrations (Supabase)
├── lib/             # Utility functions
├── pages/           # Page components
│   └── admin/       # Admin pages
└── assets/          # Static assets
```

## Database Schema

- **products** - Product catalog with categories, pricing, stock
- **categories** - Product categories
- **reviews** - Customer reviews with images
- **team_members** - Team member profiles
- **user_roles** - User role management (admin/user)

## Deployment

The project can be deployed via:

1. **Lovable** - Click Share → Publish in the Lovable editor
2. **Custom hosting** - Build with `npm run build` and deploy the `dist` folder

## License

MIT License
