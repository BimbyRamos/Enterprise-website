# Enterprise Corporate Website

A modern, full-stack enterprise corporate website built with Next.js 14, TypeScript, and Tailwind CSS.

## Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React** - UI library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **PostgreSQL** - Relational database
- **Redis** - Caching layer
- **Strapi** - Headless CMS

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn
- Docker and Docker Compose (for containerized setup)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd enterprise-corporate-website
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration values.

### Development

#### Local Development (without Docker)

1. Start the development server:
```bash
npm run dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser.

#### Docker Development

1. Start all services with Docker Compose:
```bash
docker-compose -f docker-compose.dev.yml up -d
```

This will start PostgreSQL and Redis containers for local development.

2. Run the Next.js development server:
```bash
npm run dev
```

### Building for Production

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

### Docker Production Deployment

Build and run all services:
```bash
docker-compose up -d
```

This will start:
- Frontend (Next.js) on port 3000
- Backend API (Express) on port 4000
- Strapi CMS on port 1337
- PostgreSQL on port 5432
- Redis on port 6379

## Project Structure

```
.
├── app/                    # Next.js App Router pages
├── components/             # React components
├── lib/                    # Utility functions and libraries
├── public/                 # Static assets
├── backend/                # Express API server
├── strapi/                 # Strapi CMS
├── .env.example            # Environment variables template
├── docker-compose.yml      # Production Docker configuration
├── docker-compose.dev.yml  # Development Docker configuration
├── Dockerfile.frontend     # Frontend Docker image
├── Dockerfile.backend      # Backend Docker image
├── Dockerfile.strapi       # Strapi Docker image
├── next.config.js          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## Design System

The project uses a custom design system with:
- **Primary Color**: Red (#E31837)
- **Typography**: Inter font family
- **Spacing**: 4px base unit
- **Breakpoints**: Mobile (<768px), Tablet (768-1023px), Desktop (≥1024px)

See `tailwind.config.ts` for complete design tokens.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Environment Variables

See `.env.example` for all available environment variables and their descriptions.

## License

Private - All rights reserved
