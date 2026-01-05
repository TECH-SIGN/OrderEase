# Contributing to OrderEase

Thank you for your interest in contributing to OrderEase! This guide will help you understand our development workflow, coding standards, and contribution process.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Repository Structure](#repository-structure)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [How to Contribute](#how-to-contribute)
- [Testing Guidelines](#testing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Code Review](#code-review)
- [Community Guidelines](#community-guidelines)

## 🚀 Getting Started

### Prerequisites

Before contributing, ensure you have:
- Read the [README.md](./README.md) for project overview
- Set up the development environment (see [Local Setup](./README.md#-local-setup))
- Familiarized yourself with the [Architecture](./backend/ARCHITECTURE.md)
- Installed all required dependencies

### First-Time Setup

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/OrderEase.git
   cd OrderEase
   ```

3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/TECH-SIGN/OrderEase.git
   ```

4. **Install dependencies**:
   ```bash
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd ../frontend
   npm install
   ```

5. **Set up the database**:
   ```bash
   cd backend
   npm run db:setup  # Generates Prisma client, runs migrations, and seeds data
   ```

6. **Verify setup**:
   ```bash
   # Start backend
   cd backend
   npm run start:dev
   
   # In another terminal, start frontend
   cd frontend
   npm start
   ```

## 📁 Repository Structure

```
OrderEase/
├── backend/              # NestJS backend (PostgreSQL + Prisma)
│   ├── prisma/          # Database schema and seeds
│   ├── src/             # Source code
│   │   ├── auth/        # Authentication module
│   │   ├── user/        # User management
│   │   ├── admin/       # Admin features
│   │   ├── food/        # Menu management
│   │   ├── cart/        # Shopping cart
│   │   ├── order/       # Order processing
│   │   ├── public/      # Public endpoints
│   │   ├── gateway/     # API gateway (logging, errors)
│   │   └── database/    # Prisma service
│   └── test/            # E2E tests
│
├── frontend/            # React frontend
│   ├── src/
│   │   ├── api/         # API client
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── redux/       # State management
│   │   ├── services/    # API services
│   │   └── utils/       # Utility functions
│   └── public/          # Static assets
│
└── docs/                # Additional documentation
```

### Module Responsibilities

**Backend Modules:**
- **auth**: Authentication, JWT tokens, signup/login
- **user**: User profile management
- **admin**: Admin dashboard, user management, stats
- **food**: Menu item CRUD operations
- **cart**: Shopping cart functionality
- **order**: Order creation and management
- **public**: Public endpoints (menu browsing, health check)
- **gateway**: Cross-cutting concerns (logging, error handling, rate limiting)

**Frontend Structure:**
- **pages**: Top-level route components
- **components**: Reusable UI components (organized by feature)
- **redux**: Global state management (auth, cart, orders)
- **services**: API communication layer
- **utils**: Helper functions and utilities

## 🔄 Development Workflow

### Branching Strategy

We follow a simplified Git Flow:

- **`main`**: Production-ready code
- **Feature branches**: `feature/feature-name`
- **Bug fixes**: `fix/bug-description`
- **Documentation**: `docs/topic`
- **Refactoring**: `refactor/description`

### Creating a Feature Branch

```bash
# Update your main branch
git checkout main
git pull upstream main

# Create a new feature branch
git checkout -b feature/your-feature-name

# Make your changes...

# Commit your changes
git add .
git commit -m "feat: add your feature"

# Push to your fork
git push origin feature/your-feature-name
```

### Keeping Your Branch Updated

```bash
# Fetch latest changes from upstream
git fetch upstream

# Rebase your branch on main
git checkout feature/your-feature-name
git rebase upstream/main

# If conflicts occur, resolve them and continue
git add .
git rebase --continue

# Force push to your fork (rebase changes history)
git push origin feature/your-feature-name --force
```

## 💻 Coding Standards

### General Principles

1. **Write clean, readable code**: Code is read more than written
2. **Follow existing patterns**: Match the style of the codebase
3. **Keep it simple**: Avoid over-engineering
4. **Comment wisely**: Explain *why*, not *what*
5. **Type safety**: Use TypeScript types properly

### Backend (NestJS/TypeScript)

#### File Naming
- Controllers: `feature.controller.ts`
- Services: `feature.service.ts`
- DTOs: `feature.dto.ts` or `create-feature.dto.ts`
- Modules: `feature.module.ts`

#### Code Style

```typescript
// ✅ Good: Use proper types
interface CreateFoodDto {
  name: string;
  price: number;
  category: string;
  description?: string;
}

async createFood(dto: CreateFoodDto): Promise<Food> {
  return this.prisma.food.create({
    data: dto,
  });
}

// ❌ Bad: Using 'any'
async createFood(data: any): Promise<any> {
  return this.prisma.food.create({ data });
}
```

```typescript
// ✅ Good: Proper error handling
async findFoodById(id: string): Promise<Food> {
  const food = await this.prisma.food.findUnique({
    where: { id },
  });
  
  if (!food) {
    throw new NotFoundException('Food item not found');
  }
  
  return food;
}

// ❌ Bad: Silent errors
async findFoodById(id: string): Promise<Food | null> {
  return this.prisma.food.findUnique({
    where: { id },
  });
}
```

#### Validation

Use class-validator decorators in DTOs:

```typescript
export class CreateFoodDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @IsNumber()
  @Min(0)
  @Max(10000)
  price: number;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;

  @IsUrl()
  @IsOptional()
  image?: string;
}
```

#### Module Structure

Each feature should be self-contained:

```
feature/
├── feature.controller.ts    # HTTP endpoints
├── feature.service.ts       # Business logic
├── feature.module.ts        # Module definition
├── dto/
│   ├── create-feature.dto.ts
│   ├── update-feature.dto.ts
│   └── index.ts
└── index.ts                 # Public exports
```

### Frontend (React/TypeScript)

#### File Naming
- Components: `ComponentName.jsx` or `ComponentName.tsx`
- Pages: `PageName.jsx` (e.g., `MenuPage.jsx`)
- Services: `feature.api.js`
- Redux slices: `featureSlice.js`

#### Component Style

```jsx
// ✅ Good: Functional component with proper structure
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenu } from '../redux/slices/menuSlice';

const MenuPage = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.menu);

  useEffect(() => {
    dispatch(fetchMenu());
  }, [dispatch]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">Our Menu</h1>
      <MenuGrid items={items} />
    </div>
  );
};

export default MenuPage;
```

```jsx
// ❌ Bad: Class component with complex logic
class MenuPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], loading: true };
  }

  componentDidMount() {
    // Complex logic here...
  }

  render() {
    // Long render method...
  }
}
```

#### State Management

```javascript
// ✅ Good: Use Redux Toolkit
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { menuApi } from '../../services/api/menu.api';

export const fetchMenu = createAsyncThunk(
  'menu/fetchMenu',
  async () => {
    const response = await menuApi.getMenu();
    return response.data;
  }
);

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default menuSlice.reducer;
```

### Commit Message Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**

```bash
feat(cart): add ability to update item quantity

- Add PUT endpoint for cart item updates
- Add quantity validation
- Update cart total calculation

Closes #42
```

```bash
fix(auth): prevent token expiry before refresh

Previously, tokens could expire milliseconds before the
refresh happened, causing authentication errors.

Fixes #123
```

```bash
docs(readme): update setup instructions for PostgreSQL

Add clearer instructions for setting up PostgreSQL on
different operating systems.
```

## 🎯 How to Contribute

### Types of Contributions

1. **Bug Reports**: Found a bug? Open an issue
2. **Feature Requests**: Have an idea? Propose it
3. **Code Contributions**: Ready to code? Submit a PR
4. **Documentation**: Improve our docs
5. **Reviews**: Help review pull requests

### Reporting Bugs

When reporting bugs, include:

1. **Clear title**: Summarize the issue
2. **Description**: What happened vs. what should happen
3. **Steps to reproduce**:
   ```
   1. Go to '...'
   2. Click on '...'
   3. Scroll down to '...'
   4. See error
   ```
4. **Expected behavior**: What should happen
5. **Screenshots**: If applicable
6. **Environment**:
   - OS: [e.g., Windows 10, macOS 12.0]
   - Browser: [e.g., Chrome 96, Firefox 94]
   - Node version: [e.g., 18.12.0]
   - npm version: [e.g., 8.19.2]

### Requesting Features

When requesting features, include:

1. **Problem**: What problem does this solve?
2. **Solution**: Describe your proposed solution
3. **Alternatives**: Other solutions you've considered
4. **Additional context**: Any other relevant information
5. **Mockups**: If applicable (for UI features)

### Adding New Features

1. **Check existing issues/PRs** to avoid duplication
2. **Open an issue** to discuss the feature first
3. **Get approval** from maintainers before starting
4. **Create a feature branch**
5. **Implement the feature** following our standards
6. **Add tests** for your feature
7. **Update documentation**
8. **Submit a pull request**

### Fixing Bugs

1. **Check if issue exists**, if not, create one
2. **Create a fix branch**
3. **Write a test** that reproduces the bug
4. **Fix the bug**
5. **Ensure test passes**
6. **Submit a pull request**

## 🧪 Testing Guidelines

### Backend Testing

```typescript
// Unit test example
describe('FoodService', () => {
  let service: FoodService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FoodService,
        {
          provide: PrismaService,
          useValue: {
            food: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<FoodService>(FoodService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should create a food item', async () => {
    const dto = {
      name: 'Test Food',
      price: 10.99,
      category: 'Starters',
    };

    const expected = { id: '1', ...dto };
    jest.spyOn(prisma.food, 'create').mockResolvedValue(expected);

    const result = await service.createFood(dto);
    expect(result).toEqual(expected);
  });
});
```

### Frontend Testing

```javascript
// Component test example
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import MenuItem from './MenuItem';

describe('MenuItem Component', () => {
  const mockStore = configureStore({
    reducer: {
      cart: cartReducer,
    },
  });

  it('should display food item details', () => {
    const item = {
      id: '1',
      name: 'Test Food',
      price: 10.99,
      category: 'Starters',
    };

    render(
      <Provider store={mockStore}>
        <MenuItem item={item} />
      </Provider>
    );

    expect(screen.getByText('Test Food')).toBeInTheDocument();
    expect(screen.getByText('$10.99')).toBeInTheDocument();
  });

  it('should add item to cart on button click', () => {
    const item = { id: '1', name: 'Test Food', price: 10.99 };

    render(
      <Provider store={mockStore}>
        <MenuItem item={item} />
      </Provider>
    );

    const addButton = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(addButton);

    // Assert cart state updated
  });
});
```

### Running Tests

```bash
# Backend tests
cd backend
npm run test           # Run all tests
npm run test:watch     # Watch mode
npm run test:cov       # With coverage
npm run test:e2e       # E2E tests

# Frontend tests
cd frontend
npm test               # Interactive watch mode
npm run test -- --coverage  # With coverage
```

### Test Coverage Guidelines

- **Aim for 70%+ coverage** for critical paths
- **Test edge cases** and error conditions
- **Mock external dependencies** (database, APIs)
- **Test user interactions** (clicks, form submissions)

## 🔍 Pull Request Process

### Before Submitting

1. **Ensure code quality**:
   ```bash
   # Backend
   cd backend
   npm run lint          # Run linter
   npm run format        # Format code
   npm run test          # Run tests
   
   # Frontend
   cd frontend
   npm run test          # Run tests
   ```

2. **Update documentation** if needed
3. **Add tests** for new features
4. **Test manually** in browser/API client

### Submitting a PR

1. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Open a pull request** on GitHub
3. **Fill out the PR template**:
   - Description of changes
   - Related issue number
   - Type of change (feature, fix, docs, etc.)
   - Testing done
   - Screenshots (if UI changes)

4. **Request review** from maintainers

### PR Template

```markdown
## Description
Brief description of what this PR does.

## Related Issue
Closes #(issue number)

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] E2E tests pass (if applicable)
- [ ] Manual testing completed

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code where needed
- [ ] I have updated the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix/feature works
- [ ] New and existing tests pass locally
```

## 👀 Code Review

### For Contributors

- **Be responsive** to review feedback
- **Be open** to suggestions
- **Ask questions** if feedback is unclear
- **Update your PR** based on review
- **Be patient**: Reviews take time

### Review Checklist

Reviewers will check:

- [ ] Code follows project style guidelines
- [ ] Changes are necessary and make sense
- [ ] Tests are included and pass
- [ ] Documentation is updated
- [ ] No security vulnerabilities introduced
- [ ] Performance implications considered
- [ ] Error handling is appropriate
- [ ] Code is maintainable

## 🤝 Community Guidelines

### Be Respectful

- Use welcoming and inclusive language
- Be respectful of differing viewpoints
- Accept constructive criticism gracefully
- Focus on what is best for the community

### Be Collaborative

- Help newcomers get started
- Share knowledge and resources
- Review others' pull requests
- Participate in discussions

### Be Professional

- Keep discussions on-topic
- Avoid offensive language
- Report inappropriate behavior
- Follow the Code of Conduct

## 📚 Additional Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [React Documentation](https://react.dev/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## ❓ Questions?

- Open an issue with the `question` label
- Check existing issues and discussions
- Review the [README.md](./README.md) and other documentation

---

**Thank you for contributing to OrderEase!** 🙏

Your contributions make this project better for everyone.
