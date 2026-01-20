# OrderEase Monorepo

A pnpm workspace-based monorepo for the OrderEase restaurant ordering system.

## 🏗️ Architecture

This monorepo follows Clean Architecture principles with clear separation of concerns:

```
orderease/
├── apps/
│   ├── api-gateway/        # Authentication, rate limiting, routing (stub)
│   ├── order-service/      # Core business logic for orders, cart, food, users
│   └── payment-service/    # Payment processing (stub - future implementation)
│
├── packages/
│   ├── shared-types/       # DTOs, enums, interfaces, constants
│   ├── shared-utils/       # Pure utilities (password, jwt, response)
│   ├── shared-errors/      # Domain error classes
│   └── shared-config/      # Environment validation schemas
│
├── pnpm-workspace.yaml
├── package.json
└── tsconfig.base.json
```

## 📦 Packages

### Shared Packages

- **@orderease/shared-types**: Common types, enums, and constants
- **@orderease/shared-utils**: Reusable utilities (password hashing, JWT parsing, response formatting)
- **@orderease/shared-errors**: Domain error classes (OrderDomainError, CartDomainError, etc.)
- **@orderease/shared-config**: Environment variable validation using Zod

### Applications

- **@orderease/order-service**: Main backend service with NestJS, Prisma, and PostgreSQL
  - Auth module
  - User management
  - Order management
  - Cart management
  - Food catalog
  - Admin dashboard
  
- **@orderease/api-gateway**: (Stub) Future API gateway for routing and auth
- **@orderease/payment-service**: (Stub) Future payment processing service

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- PostgreSQL >= 14

### Installation

```bash
# Install pnpm globally if not already installed
npm install -g pnpm

# Install all dependencies
pnpm install

# Generate Prisma client
cd apps/order-service
pnpm prisma:generate
```

### Development

```bash
# Build all packages
pnpm build

# Run order-service in development mode
pnpm dev:order-service

# Run all services in parallel
pnpm dev
```

### Environment Setup

Copy `.env.example` to `.env` in `apps/order-service/` and configure:

```bash
cp apps/order-service/.env.example apps/order-service/.env
```

Required environment variables:
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: JWT signing secret (min 32 characters)
- `JWT_REFRESH_SECRET`: JWT refresh token secret (min 32 characters)
- `PORT`: Application port (default: 3000)
- `NODE_ENV`: Environment (development/production/test)
- `CORS_ORIGIN`: Allowed CORS origins

### Database Setup

```bash
cd apps/order-service

# Run migrations
pnpm prisma:migrate

# Seed database
pnpm prisma:seed

# Open Prisma Studio
pnpm prisma:studio
```

## 🧪 Testing

```bash
# Run tests for all packages
pnpm test

# Run tests for specific package
pnpm --filter @orderease/order-service test

# Run e2e tests
cd apps/order-service
pnpm test:e2e
```

## 📝 Scripts

### Root Level

- `pnpm build`: Build all packages
- `pnpm dev`: Run all services in parallel
- `pnpm test`: Run tests for all packages
- `pnpm lint`: Lint all packages
- `pnpm clean`: Remove dist and node_modules from all packages

### Per-Service Scripts

- `pnpm dev:order-service`: Run order service in watch mode
- `pnpm dev:api-gateway`: (Stub) Run API gateway
- `pnpm dev:payment-service`: (Stub) Run payment service

## 🏛️ Clean Architecture

The codebase follows Clean Architecture with these layers:

1. **Domain Layer** (`domain/`): Pure business logic
   - Entities
   - Value objects
   - Domain errors
   - Business rules

2. **Application Layer** (`*.service.ts`): Use cases and orchestration
   - Services
   - DTOs
   - Application logic

3. **Infrastructure Layer** (`infra/`): External concerns
   - Repository implementations (Prisma)
   - Database access
   - External APIs

4. **Presentation Layer** (`*.controller.ts`): HTTP endpoints
   - Controllers
   - Guards
   - Interceptors
   - Filters

## 🔐 Security

- Environment variable validation using Zod
- JWT-based authentication
- Role-based access control (RBAC)
- Password hashing with bcrypt
- CORS protection
- Rate limiting (in-memory, production should use Redis)

## 🛠️ Tech Stack

- **Runtime**: Node.js 18+
- **Language**: TypeScript
- **Framework**: NestJS
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Package Manager**: pnpm (workspace)
- **Validation**: class-validator, class-transformer, Zod
- **Authentication**: JWT, Passport

## 📚 Documentation

- [Backend API Documentation](./apps/order-service/doc/API.md)
- [Architecture Guide](./apps/order-service/doc/ARCHITECTURE.md)
- [Logging Guide](./apps/order-service/doc/LOGGING.md)
- [Testing Guide](./apps/order-service/doc/TESTING.md)

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines.

## 📄 License

MIT License - see [LICENSE](./LICENSE)

## 🔄 Migration Notes

This codebase was migrated from a monolithic structure to a pnpm workspace monorepo while:
- Preserving all existing business logic
- Maintaining API compatibility
- Keeping the same database schema
- Retaining all tests and documentation

The migration enables:
- Better code organization
- Shared code reusability
- Independent service deployment (future)
- Clearer separation of concerns
